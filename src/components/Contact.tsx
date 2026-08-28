import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import type { PortfolioData } from '../data/portfolio.types';
import SectionHeading from './ui/SectionHeading';

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
            label: 'Email',
            value: profile.social.email,
            href: `mailto:${profile.social.email}`,
        },
        {
            icon: Phone,
            label: 'Phone',
            value: profile.social.phone,
            href: `tel:${profile.social.phone.replace(/\s+/g, '')}`,
        },
        {
            icon: MapPin,
            label: 'Location',
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
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Message Sent</h2>
                    <p className="text-slate-400">Thanks for reaching out! I'll get back to you soon.</p>
                </div>
            </section>
        );
    }

    if (showError) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-red-400 mb-4">Error Sending Message</h2>
                    <p className="text-slate-400">Please check your details and try again.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Contact"
                    title="Get In Touch"
                    description="I'm always open to discussing new opportunities, collaborations, or just having a chat about technology. Feel free to reach out!"
                />

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <div
                                        key={info.label}
                                        className="flex items-start p-4 bg-surface rounded-lg border border-border hover:border-accent-cyan/30 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium mb-1">{info.label}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-slate-200 font-semibold hover:text-accent-cyan transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-slate-200 font-semibold">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <h4 className="text-xl font-bold text-white mb-4">Connect With Me</h4>
                        <div className="space-y-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-surface rounded-lg border border-border hover:border-accent-cyan/30 transition-colors group"
                                    >
                                        <Icon className="w-6 h-6 text-slate-400 mr-4 group-hover:text-accent-cyan transition-colors" />
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">{social.label}</p>
                                            <p className="text-slate-200 font-semibold">{social.username}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="mt-8 p-6 bg-accent-gradient rounded-xl text-white">
                            <h4 className="text-lg font-bold mb-2">Open to Opportunities</h4>
                            <p className="text-white/90 text-sm">
                                Currently seeking full-time positions, internships, and freelance opportunities in
                                backend development, full-stack engineering, and software development roles.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                                    placeholder="Job Opportunity"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all resize-none"
                                    placeholder="Tell me about the opportunity or project..."
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="w-full px-8 py-4 bg-accent-gradient text-white rounded-lg font-medium hover:brightness-110 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center group"
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
