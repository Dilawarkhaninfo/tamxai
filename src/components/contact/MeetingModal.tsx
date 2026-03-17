'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Target, Box, TrendingUp, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Globe, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'calendar' | 'details' | 'success';

export function MeetingModal({ isOpen, onClose }: MeetingModalProps) {
  const [step, setStep] = useState<Step>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
        setStep('calendar');
        setSelectedDate(null);
        setSelectedTime(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-dark-primary/95 md:bg-dark-primary/80 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-dark-secondary border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row relative max-h-[95vh] md:max-h-none"
            >
              {/* Close Button */}
              <button 
                onClick={resetAndClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-[110]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Panel: Meeting Info */}
              <div className="w-full md:w-2/5 p-6 md:p-12 bg-white/5 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                <div className="flex items-center gap-3 mb-6 md:mb-12">
                   <div className="size-8 md:size-10 rounded-xl bg-brand-purple flex items-center justify-center shadow-glow-purple">
                      <span className="text-white font-bold text-sm md:text-base">TX</span>
                   </div>
                   <span className="text-white font-bold tracking-tighter text-lg md:text-xl">TAMx</span>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 md:pr-0 mb-4 md:mb-0">
                    <div className="size-12 md:size-16 rounded-2xl bg-brand-lavender/10 border border-brand-lavender/20 flex items-center justify-center mb-4 md:mb-6">
                        <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-brand-lavender" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 tracking-tight">Strategy Consultation</h2>
                    <div className="flex items-center gap-2 text-text-secondary mb-4 md:mb-8">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs md:text-sm font-medium">30 Minutes</span>
                    </div>

                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-8 opacity-70">
                        Choose a convenient time to discuss your project requirements and explore technical solutions with our senior engineering squad.
                    </p>

                    <div className="space-y-3 md:space-y-4 hidden md:block">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">On the agenda:</p>
                        {[
                            { icon: Target, text: "Business goals & vision" },
                            { icon: Box, text: "Technical architecture" },
                            { icon: TrendingUp, text: "Timeline & cost estimation" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                                <item.icon className="w-4 h-4 text-brand-lavender" />
                                <span className="text-xs md:text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 md:pt-8 border-t border-white/5 flex items-center gap-4 mt-auto">
                    <div className="size-8 md:size-10 rounded-full bg-brand-purple overflow-hidden border border-brand-lavender/20">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Engineer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-xs md:text-sm">Lead Solutions Engineer</p>
                        <p className="text-text-muted text-[10px] md:text-xs">Awaiting Coordination</p>
                    </div>
                </div>
              </div>

              {/* Right Panel: Interactive Area */}
              <div className="flex-1 p-6 md:p-12 bg-dark-secondary relative overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                {step === 'calendar' && (
                    <CalendarStep 
                        onSelect={(date, time) => {
                            setSelectedDate(date);
                            setSelectedTime(time);
                            setStep('details');
                        }} 
                    />
                )}
                {step === 'details' && (
                    <DetailsStep 
                        date={selectedDate!} 
                        time={selectedTime!} 
                        onBack={() => setStep('calendar')}
                        onSuccess={() => setStep('success')}
                    />
                )}
                {step === 'success' && (
                    <SuccessStep 
                        date={selectedDate!}
                        time={selectedTime!}
                    />
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- SUB-COMPONENTS ---

function CalendarStep({ onSelect }: { onSelect: (date: Date, time: string) => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    
    const times = ["10:00 AM", "11:00 AM", "1:30 PM", "2:00 PM", "4:30 PM"];

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-white">Select Date & Time</h3>
                <div className="flex items-center gap-1 text-text-muted text-[10px] md:text-xs font-medium bg-white/5 py-1 px-3 rounded-full w-fit">
                    <Globe className="w-3 h-3" />
                    <span>UTC +5:00 (Karachi)</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Calendar */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <span className="text-white font-bold text-sm md:text-base">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex gap-1 md:gap-2">
                            <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] md:text-xs font-bold text-text-muted mb-4 uppercase tracking-widest">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {blanks.map(i => <div key={`b-${i}`} />)}
                        {calendarDays.map(d => {
                            const isSelected = selectedDate === d;
                            const isToday = d === new Date().getDate();
                            const isPast = d < new Date().getDate();
                            
                            return (
                                <button
                                    key={d}
                                    disabled={isPast}
                                    onClick={() => setSelectedDate(d)}
                                    className={cn(
                                        "aspect-square rounded-lg md:rounded-xl flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 relative group",
                                        isPast ? "text-white/10 cursor-not-allowed" : "text-white/80 hover:bg-brand-purple/20 hover:text-brand-lavender",
                                        isSelected && "bg-brand-purple text-white shadow-glow-purple",
                                        isToday && !isSelected && "border border-brand-lavender/30"
                                    )}
                                >
                                    {d}
                                    {!isPast && !isSelected && d % 3 === 0 && (
                                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-brand-lavender/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Time Slots */}
                <div className="w-full lg:w-48 xl:w-56 mt-4 lg:mt-0">
                    {selectedDate ? (
                        <div className="space-y-2 md:space-y-3">
                            <p className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest mb-3 md:mb-4">Available Slots</p>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                {times.map((t, idx) => (
                                    <motion.button
                                        key={t}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => onSelect(new Date(), t)}
                                        className="w-full py-3 md:py-4 rounded-xl border border-white/5 bg-white/5 text-white text-sm md:text-base font-medium hover:border-brand-lavender hover:bg-brand-lavender/10 hover:shadow-glow-lavender transition-all duration-300"
                                    >
                                        {t}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-0 border border-white/5 border-dashed rounded-2xl p-6 opacity-30 h-32 md:h-full">
                            <CalendarIcon className="w-6 h-6 md:w-8 md:h-8 lg:mb-4" />
                            <p className="text-[10px] md:text-xs text-center font-medium">Select a date to <br className="hidden lg:block" /> view available slots</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function DetailsStep({ date, time, onBack, onSuccess }: { date: Date, time: string, onBack: () => void, onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        onSuccess();
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
        >
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-brand-lavender text-xs md:text-sm font-bold mb-6 md:mb-8 hover:translate-x-[-4px] transition-transform w-fit"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Calendar
            </button>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 tracking-tight">Finalize Details</h3>
            <p className="text-text-secondary text-xs md:text-sm mb-6 md:mb-8 opacity-60">
                A calendar invitation will be sent to your business email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                        <input required placeholder="Elon Musk" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm md:text-base focus:border-brand-lavender outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Business Email</label>
                        <input required type="email" placeholder="elon@tesla.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm md:text-base focus:border-brand-lavender outline-none transition-colors" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Company Name</label>
                    <input required placeholder="Tesla / SpaceX" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm md:text-base focus:border-brand-lavender outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Project Type / Goals</label>
                    <textarea placeholder="Tell us about your technical vision..." rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm md:text-base focus:border-brand-lavender outline-none transition-colors resize-none" />
                </div>

                <div className="pt-2 md:pt-4">
                    <button 
                        disabled={loading}
                        className="w-full bg-white text-dark-primary font-bold py-4 md:py-5 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-sm md:text-base"
                    >
                        {loading ? 'Securing Timeslot...' : 'Confirm Strategy Call'}
                        {!loading && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

function SuccessStep({ date, time }: { date: Date, time: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-6 md:py-0"
        >
            <div className="size-20 md:size-24 rounded-full bg-brand-lavender/20 flex items-center justify-center mb-6 md:mb-8 shadow-glow-lavender">
                <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-brand-lavender" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-tight">Booking Confirmed!</h3>
            <p className="text-text-secondary text-sm md:text-base opacity-70 max-w-xs md:max-w-sm mb-8 md:mb-12 leading-relaxed">
                Your strategy call is scheduled. Check your inbox for the calendar invite and meeting link.
            </p>

            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 mb-8 md:mb-12">
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between text-[11px] md:text-sm">
                        <span className="text-text-muted font-medium">Date</span>
                        <span className="text-white font-bold">Friday, May 24, 2024</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] md:text-sm">
                        <span className="text-text-muted font-medium">Time</span>
                        <span className="text-white font-bold">{time} (UTC +5:00)</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] md:text-sm">
                        <span className="text-text-muted font-medium">Platform</span>
                        <span className="text-white font-bold">Zoom Meeting</span>
                    </div>
                </div>
            </div>

            <button className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-all text-xs md:text-sm">
                <CalendarIcon className="w-4 h-4 md:w-5 md:h-5" />
                Add to Google Calendar
            </button>
        </motion.div>
    );
}
