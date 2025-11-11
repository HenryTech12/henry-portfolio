import { ArrowRight, Download, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-gray-600 text-sm">Akoka-Yaba, Lagos, Nigeria</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="block text-gray-900 mb-2">Fakorode Odunayo Henry</span>
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                            Full Stack Java Developer
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Building scalable and secure web applications with Spring Boot, microservices, and
                        modern backend architectures. Passionate about clean code, optimization, and delivering
                        high-performance solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button
                            onClick={() => {
                                const element = document.getElementById('contact');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Get In Touch
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a
                            href="../public/assets/resume.pdf"
                            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                        >
                            <Download className="inline-block mr-2 w-5 h-5" />
                            Download Resume
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">55+</div>
                            <div className="text-gray-600 text-sm">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-600 mb-2">2</div>
                            <div className="text-gray-600 text-sm">Internships</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">A+</div>
                            <div className="text-gray-600 text-sm">Performance Grade</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-600 mb-2">2</div>
                            <div className="text-gray-600 text-sm">Awards Won</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
