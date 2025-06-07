'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
};

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;
  const setOpen = isControlled ? (setOpenProp as React.Dispatch<React.SetStateAction<boolean>>) : setOpenState;

  return <SidebarContext.Provider value={{ open, setOpen, animate }}>{children}</SidebarContext.Provider>;
};

interface EnhancedSidebarProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  items: NavigationItem[];
}

export const EnhancedSidebar = ({ children, open, setOpen, animate = true, items }: EnhancedSidebarProps) => {
  const pathname = usePathname();
  const controls = useAnimation();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      controls.start({
        width: animate ? (open ? 256 : 80) : 256,
        transition: { duration: 0.3, ease: 'easeInOut' },
      });
    } else {
      controls.start({
        width: 256,
        transition: { duration: 0.3, ease: 'easeInOut' },
      });
    }
  }, [open, animate, isDesktop, controls]);

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <div className="flex h-full relative">
        {/* Desktop Sidebar */}
        <motion.div
          className={cn(
            'hidden lg:flex lg:flex-col h-screen bg-slate-800 border-r border-slate-700 overflow-hidden',
            'fixed left-0 top-0 z-40'
          )}
          animate={controls}
          initial={{ width: 256 }}
        >
          <div className="flex items-center h-16 px-4 border-b border-slate-700">
            <motion.div
              className="flex items-center"
              animate={{
                justifyContent: open ? 'flex-start' : 'center',
                paddingLeft: open ? '0.5rem' : '0',
                width: '100%',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-8 w-8 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm bg-blue-500 flex-shrink-0" />
              <AnimatePresence>
                {open && (
                  <motion.span
                    className="ml-2 text-xl font-bold text-white whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    AI Study Buddy
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {items.map(item => {
                const isActive = pathname === item.href;
                return (
                  <SidebarLink
                    key={item.name}
                    href={item.href}
                    icon={<item.icon className="h-5 w-5 flex-shrink-0" />}
                    isActive={isActive}
                    open={open}
                    animate={animate}
                  >
                    {item.name}
                  </SidebarLink>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <button
              onClick={() => setOpen?.(!open)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              {open ? (
                <>
                  <ChevronLeft className="h-5 w-5" />
                  <AnimatePresence>
                    <motion.span
                      className="ml-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Collapse
                    </motion.span>
                  </AnimatePresence>
                </>
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <MobileSidebar items={items} />

        {/* Main Content - properly offset based on sidebar state */}
        <motion.div
          className={cn('flex-1 flex flex-col min-h-screen bg-slate-900')}
          animate={{
            marginLeft: isDesktop ? (open ? 256 : 80) : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </div>
    </SidebarProvider>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  open: boolean;
  animate?: boolean;
}

const SidebarLink = ({ href, icon, children, isActive, open, animate: _animate = true }: SidebarLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
        x: 5,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        },
      });
    } else {
      controls.start({
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        },
      });
    }
  }, [isHovered, controls]);

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors',
        isActive ? 'bg-blue-900/50 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
        open ? 'justify-start' : 'justify-center'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md"
          layoutId="activeIndicator"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
      <motion.div className="flex items-center" animate={controls}>
        <div className={cn('flex-shrink-0', open ? 'mr-3' : 'mx-auto')}>{icon}</div>
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm whitespace-nowrap"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const MobileSidebar = ({ items }: { items: NavigationItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const overlayControls = useAnimation();
  const sidebarControls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      overlayControls.start({ opacity: 1 });
      sidebarControls.start({ x: 0 });
    } else {
      document.body.style.overflow = 'auto';
      overlayControls.start({ opacity: 0 });
      sidebarControls.start({ x: '-100%' });
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, overlayControls, sidebarControls]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-slate-300 hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={overlayControls}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={sidebarControls}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              className="fixed inset-y-0 left-0 w-64 z-50 bg-slate-800 border-r border-slate-700 flex flex-col"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm bg-blue-500 flex-shrink-0" />
                  <span className="ml-2 text-xl font-bold text-white">AI Study Buddy</span>
                </div>
                <button
                  type="button"
                  className="p-1 rounded-md text-slate-300 hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  {items.map(item => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mx-2',
                          isActive
                            ? 'bg-blue-900/50 text-white'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
