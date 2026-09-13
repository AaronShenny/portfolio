import { useListInquiries } from '@workspace/api-client-react';
import { format } from 'date-fns';
import { Link } from 'wouter';
import { ArrowLeft, Loader2, Mail, ExternalLink } from 'lucide-react';
import { useClerk } from '@clerk/react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const { data: inquiries, isLoading, error } = useListInquiries();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut({ redirectUrl: '/' });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground bg-grid">
      <div className="min-h-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Studio
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Inquiries</h1>
          </div>
          
          <button
            onClick={handleSignOut}
            className="text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign Out
          </button>
        </header>

        <main className="flex-1 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="bg-destructive/10 text-destructive p-4 rounded-none border border-destructive/20 mb-4">
                Failed to load inquiries. Ensure you have the correct permissions.
              </div>
            </div>
          ) : !inquiries || inquiries.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto border border-dashed border-border p-12">
              <Mail className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2 uppercase tracking-widest">No Inquiries</h3>
              <p className="text-sm text-muted-foreground">When potential clients fill out the contact form, their requests will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {inquiries.map((inquiry, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={inquiry.id} 
                  className="group relative bg-card border border-border p-6 md:p-8 hover:border-foreground/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{inquiry.name}</h3>
                      {inquiry.business && (
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{inquiry.business}</p>
                      )}
                      <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-3">
                        <Mail className="w-3.5 h-3.5" /> {inquiry.email}
                      </a>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-2">
                      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        {format(new Date(inquiry.createdAt), 'MMM dd, yyyy - HH:mm')}
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border">
                          {inquiry.projectType.replace('_', ' ')}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border">
                          {inquiry.budget.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 border border-border/50 p-4 md:p-6 text-sm leading-relaxed whitespace-pre-wrap">
                    {inquiry.details}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
