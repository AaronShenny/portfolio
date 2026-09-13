import { OverlayBase } from '../ui/OverlayBase';
import { useOverlay } from '@/context/OverlayContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCreateInquiry } from '@workspace/api-client-react';
import type { InquiryInputProjectType, InquiryInputBudget } from '@workspace/api-client-react';
import { Link } from 'wouter';

export function ContactOverlay() {
  const { close } = useOverlay();
  const [isSuccess, setIsSuccess] = useState(false);
  const createInquiry = useCreateInquiry();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createInquiry.mutate({
      data: {
        name: formData.get('name') as string,
        business: formData.get('business') as string || undefined,
        email: formData.get('email') as string,
        projectType: formData.get('type') as InquiryInputProjectType,
        budget: formData.get('budget') as InquiryInputBudget,
        details: formData.get('details') as string,
      }
    }, {
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
  };

  return (
    <OverlayBase title="START PROJECT" onClose={close}>
      <div className="max-w-2xl mx-auto pt-8 md:pt-16">
        
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 border border-border bg-muted/30"
          >
            <CheckCircle2 className="w-12 h-12 mb-6 text-foreground/80" />
            <h3 className="text-2xl font-bold tracking-tight mb-2">INQUIRY RECEIVED</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              Thank you for reaching out. We will review your project details and get back to you shortly.
            </p>
            <button 
              onClick={close}
              className="bg-foreground text-background px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors"
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">PROJECT INQUIRY</h2>
                <p className="text-sm text-muted-foreground">
                  Provide some initial details about your project to help us understand your requirements.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Name</label>
                  <input required id="name" name="name" type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="business" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Business / Brand</label>
                  <input id="business" name="business" type="text" className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Company Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Email</label>
                <input required id="email" name="email" type="email" className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label htmlFor="type" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Project Type</label>
                  <select required id="type" name="type" defaultValue="" className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="website">Website</option>
                    <option value="web_application">Web Application</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Budget Range</label>
                  <select required id="budget" name="budget" defaultValue="" className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none">
                    <option value="" disabled>Select a range</option>
                    <option value="under_10k">Under ₹10,000</option>
                    <option value="10k_25k">₹10,000 - ₹25,000</option>
                    <option value="25k_plus">₹25,000+</option>
                    <option value="not_sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label htmlFor="details" className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Project Details</label>
                <textarea required id="details" name="details" rows={4} className="w-full bg-transparent border border-border p-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Briefly describe what you're looking to build..."></textarea>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button 
                  type="submit" 
                  disabled={createInquiry.isPending}
                  className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-foreground/90 disabled:opacity-70"
                >
                  {createInquiry.isPending ? 'Sending...' : 'Send Project Inquiry'}
                  {!createInquiry.isPending && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>

                <div className="text-center sm:text-right space-y-1">
                  <p className="text-xs text-muted-foreground">Direct Contact</p>
                  <a href="mailto:extapano@gmail.com" className="block text-xs font-semibold uppercase tracking-widest text-foreground hover:text-foreground/80 transition-colors">
                    extapano@gmail.com
                  </a>
                  <Link href="/admin" className="inline-block mt-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    [Admin]
                  </Link>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </OverlayBase>
  );
}
