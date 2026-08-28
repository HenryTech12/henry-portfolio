import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT = 46;
const CONNECT_DISTANCE = 2.6;
const SPHERE_RADIUS = 4.2;
const ACCENT = 0x10b981;
const BLIP_COLOR = 0xecfdf5;
const MAX_ACTIVE_BLIPS = 4;
const BLIP_DURATION = 1.1;
const BLIP_SPAWN_MIN = 0.35;
const BLIP_SPAWN_MAX = 0.85;

function mulberry32(seed: number) {
    return function random() {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function prefersReducedMotion() {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

/**
 * Continuously-rotating 3D graph — nodes connected to nearby neighbors,
 * standing in for a distributed-systems topology. Mounted only when
 * motion is allowed and WebGL is available; the caller's static
 * dot-grid background is the fallback otherwise.
 */
const NetworkBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || prefersReducedMotion()) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 0, 9);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const random = mulberry32(1337);
        const positions: THREE.Vector3[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const phi = Math.acos(2 * random() - 1);
            const theta = 2 * Math.PI * random();
            const r = SPHERE_RADIUS * (0.55 + 0.45 * random());
            positions.push(
                new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                )
            );
        }

        const baseColor = new THREE.Color(ACCENT).multiplyScalar(0.55);
        const blipColor = new THREE.Color(BLIP_COLOR);
        const baseColors = new Float32Array(NODE_COUNT * 3);
        for (let i = 0; i < NODE_COUNT; i++) {
            baseColor.toArray(baseColors, i * 3);
        }
        const nodeColors = baseColors.slice();

        const pointGeometry = new THREE.BufferGeometry().setFromPoints(positions);
        pointGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
        const pointMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            vertexColors: true,
            size: 0.09,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });
        group.add(new THREE.Points(pointGeometry, pointMaterial));

        // "Data packet" blips: a handful of nodes randomly light up bright,
        // like events flowing through the system, then fade back to base.
        interface Blip {
            index: number;
            start: number;
        }
        const activeBlips: Blip[] = [];
        const random2 = mulberry32(2024);
        let nextSpawnAt = BLIP_SPAWN_MIN;
        const tempColor = new THREE.Color();

        const edgeVertices: number[] = [];
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                if (positions[i].distanceTo(positions[j]) < CONNECT_DISTANCE) {
                    edgeVertices.push(
                        positions[i].x, positions[i].y, positions[i].z,
                        positions[j].x, positions[j].y, positions[j].z
                    );
                }
            }
        }
        const edgeGeometry = new THREE.BufferGeometry();
        edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgeVertices, 3));
        const edgeMaterial = new THREE.LineBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.12,
        });
        group.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

        const clock = new THREE.Clock();
        const docVisibleRef = { current: true };
        const inViewRef = { current: true };
        let frameId: number;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            if (!docVisibleRef.current || !inViewRef.current) return;
            const t = clock.getElapsedTime();
            group.rotation.y = t * 0.05;
            group.rotation.x = Math.sin(t * 0.08) * 0.08;
            pointMaterial.opacity = 0.6 + Math.sin(t * 0.6) * 0.2;

            if (t >= nextSpawnAt && activeBlips.length < MAX_ACTIVE_BLIPS) {
                activeBlips.push({ index: Math.floor(random2() * NODE_COUNT), start: t });
                nextSpawnAt = t + BLIP_SPAWN_MIN + random2() * (BLIP_SPAWN_MAX - BLIP_SPAWN_MIN);
            }

            const colorAttr = pointGeometry.attributes.color as THREE.BufferAttribute;
            nodeColors.set(baseColors);
            for (let i = activeBlips.length - 1; i >= 0; i--) {
                const blip = activeBlips[i];
                const progress = (t - blip.start) / BLIP_DURATION;
                if (progress >= 1) {
                    activeBlips.splice(i, 1);
                    continue;
                }
                const intensity = Math.sin(progress * Math.PI);
                tempColor.lerpColors(baseColor, blipColor, intensity);
                tempColor.toArray(nodeColors, blip.index * 3);
            }
            colorAttr.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        const handleVisibility = () => {
            docVisibleRef.current = document.visibilityState === 'visible';
        };
        document.addEventListener('visibilitychange', handleVisibility);

        const observer = new IntersectionObserver(
            ([entry]) => {
                inViewRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(container);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
            observer.disconnect();
            pointGeometry.dispose();
            pointMaterial.dispose();
            edgeGeometry.dispose();
            edgeMaterial.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
};

export default NetworkBackground;
