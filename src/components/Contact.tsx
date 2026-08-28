import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';
import CornerFrame from './ui/CornerFrame';

const data = portfolio as PortfolioData;

const Contact = () => {
    const { profile } = data;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const formId = import.meta.env.VITE_FORMSPREE_ID as string;
    const [state, handleSubmit] = useForm(formId);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (state.succeeded) {
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }

        if (state.errors && state.errors.getFormErrors().length > 0) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [state.succeeded, state.errors]);

    const contactInfo = [
        {
            icon: Mail,
            label: 'email',
            value: profile.social.email,
            href: `mailto:${profile.social.email}`,
        },
        {
            icon: Phone,
            label: 'phone',
            value: profile.social.phone,
            href: `tel:${profile.social.phone.replace(/\s+/g, '')}`,
        },
        {
            icon: MapPin,
            label: 'location',
            value: profile.location,
            href: null,
        },
    ];

    const socialLinks = [
        {
            icon: Github,
            label: 'GitHub',
            href: profile.social.github,
            username: `@${profile.social.github.replace(/\/$/, '').split('/').pop()}`,
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: profile.social.linkedin,
            username: `@${profile.social.linkedin.replace(/\/$/, '').split('/').pop()}`,
        },
    ];

    if (showSuccess) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas text-center">
                <div className="max-w-2xl mx-auto font-mono">
                    <p className="text-accent text-sm mb-2">$ send_message --status</p>
                    <h2 className="text-2xl font-bold text-ink-primary mb-4">200 OK — message sent</h2>
                    <p className="text-ink-muted text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </div>
            </section>
        );
    }

    if (showError) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas text-center">
                <div className="max-w-2xl mx-auto font-mono">
                    <p className="text-red-400 text-sm mb-2">$ send_message --status</p>
                    <h2 className="text-2xl font-bold text-red-400 mb-4">422 Unprocessable — send failed</h2>
                    <p className="text-ink-muted text-sm">Please check your details and try again.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-canvas">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="contact"
                    title="Get In Touch"
                    description="I'm always open to discussing new opportunities, collaborations, or just having a chat about technology. Feel free to reach out!"
                />

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-6">
                            contact_information
                        </h3>

                        <div className="space-y-3 mb-8">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <div
                                        key={info.label}
                                        className="flex items-start gap-4 p-4 bg-surface border border-border hover:border-accent/40 transition-colors"
                                    >
                                        <Icon className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-ink-muted font-mono mb-1">{info.label}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-ink-primary font-medium hover:text-accent transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-ink-primary font-medium">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
                            connect
                        </h4>
                        <div className="space-y-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 bg-surface border border-border hover:border-accent/40 transition-colors group"
                                    >
                                        <Icon className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors" />
                                        <div>
                                            <p className="text-xs text-ink-muted font-mono">{social.label}</p>
                                            <p className="text-ink-primary font-medium">{social.username}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <CornerFrame className="mt-8 p-6 bg-surface">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                                open_to_opportunities
                            </h4>
                            <p className="text-ink-body text-sm leading-relaxed body-text">
                                Currently seeking full-time positions, internships, and freelance opportunities in
                                backend development, full-stack engineering, and software development roles.
                            </p>
                        </CornerFrame>
                    </div>

                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-6">
                            send_a_message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block font-mono text-xs text-ink-muted mb-2">
                                    name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border text-ink-primary placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block font-mono text-xs text-ink-muted mb-2">
                                    email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border text-ink-primary placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block font-mono text-xs text-ink-muted mb-2">
                                    subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border text-ink-primary placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Job Opportunity"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block font-mono text-xs text-ink-muted mb-2">
                                    message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-surface border border-border text-ink-primary placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Tell me about the opportunity or project..."
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="w-full px-8 py-4 bg-canvas border border-accent/60 text-accent font-mono text-sm hover:bg-accent hover:text-canvas transition-all duration-150 ease-out disabled:opacity-60 flex items-center justify-center group"
                            >
                                {state.submitting ? 'sending...' : '$ send_message'}
                                <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
