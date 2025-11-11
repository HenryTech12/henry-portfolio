import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const formId = import.meta.env.VITE_FORMSPREE_ID; // ⚠️ set in .env file
    const [state, handleSubmit] = useForm(formId);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Watch Formspree state changes
    useEffect(() => {
        if (state.succeeded) {
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }

        if (state.errors && state.errors.length > 0) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [state.succeeded, state.errors]);

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'fakorodehenry@gmail.com',
            href: 'mailto:fakorodehenry@gmail.com',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+234 810 059 7712',
            href: 'tel:+2348100597712',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Akoka-Yaba, Lagos, Nigeria',
            href: null,
        },
    ];

    const socialLinks = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/HenryTech12',
            username: '@HenryTech12',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/fakorode-henry-2663422aa',
            username: '@fakorode-henry-2663422aa',
        },
    ];

    // ✅ Success Message
    if (showSuccess) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent 🎉</h2>
                    <p className="text-gray-600">Thanks for reaching out! I’ll get back to you soon.</p>
                    <p className="text-gray-400 mt-4 text-sm">Redirecting back to form...</p>
                </div>
            </section>
        );
    }

    // ❌ Error Message
    if (showError) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Error Sending Message ❌</h2>
                    <p className="text-gray-600">Please check your details and try again.</p>
                    <p className="text-gray-400 mt-4 text-sm">Redirecting back to form...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        I'm always open to discussing new opportunities, collaborations, or just having a chat
                        about technology. Feel free to reach out!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium mb-1">{info.label}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-gray-900 font-semibold hover:text-blue-600 transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-900 font-semibold">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-4">Connect With Me</h4>
                        <div className="space-y-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                    >
                                        <Icon className="w-6 h-6 text-gray-700 mr-4 group-hover:text-blue-600 transition-colors" />
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">{social.label}</p>
                                            <p className="text-gray-900 font-semibold">{social.username}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white">
                            <h4 className="text-lg font-bold mb-2">Open to Opportunities</h4>
                            <p className="text-blue-100 text-sm">
                                Currently seeking full-time positions, internships, and freelance opportunities in
                                backend development, full-stack engineering, and software development roles.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="Job Opportunity"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                                    placeholder="Tell me about the opportunity or project..."
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
                            >
                                {state.submitting ? 'Sending...' : 'Send Message'}
                                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
