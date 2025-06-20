'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Youtube,
  Globe,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Link as LinkIcon,
  File as FileIcon,
  Grid3X3,
  List,
  BookOpen,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { useState, useRef, useEffect, ChangeEvent, FormEvent, DragEvent, ReactNode, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
interface BaseResource {
  id: number;
  title: string;
  type: 'pdf' | 'file' | 'youtube' | 'web';
  subject: string;
  status: 'ready' | 'processing' | 'failed';
  uploadDate: string;
  progress: number;
  notes?: string;
}

interface FileResource extends BaseResource {
  type: 'pdf' | 'file';
  size: string;
}

interface YouTubeResource extends BaseResource {
  type: 'youtube';
  url: string;
  duration: string;
}

interface WebResource extends BaseResource {
  type: 'web';
  url: string;
  wordCount: string;
}

type Resource = FileResource | YouTubeResource | WebResource;

interface FormData {
  title: string;
  subject: string;
  notes: string;
  file: File | null;
  url: string;
}

interface EditFormData {
  title: string;
  subject: string;
  notes: string;
}

// --- STATIC CONFIGURATION ---
const subjectTypes = [
  { id: 'all', label: 'All Subjects' },
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'biology', label: 'Biology' },
  { id: 'computer-science', label: 'Computer Science' },
  { id: 'machine-learning', label: 'Machine Learning' },
];

const initialResources: Resource[] = [
  {
    id: 1,
    title: 'Quantum Mechanics Fundamentals and Applications',
    type: 'pdf',
    subject: 'physics',
    status: 'ready',
    uploadDate: '2 days ago',
    size: '2.4 MB',
    progress: 100,
  },
  {
    id: 2,
    title: 'Advanced Organic Chemistry Reaction Mechanisms',
    type: 'youtube',
    subject: 'chemistry',
    status: 'processing',
    uploadDate: '1 hour ago',
    duration: '15:32',
    progress: 75,
    url: 'https://youtube.com',
  },
  {
    id: 3,
    title: 'Linear Algebra for Machine Learning Applications',
    type: 'web',
    subject: 'mathematics',
    status: 'ready',
    uploadDate: '1 week ago',
    wordCount: '3,200 words',
    progress: 100,
    url: 'https://example.com',
  },
  {
    id: 4,
    title: 'Deep Neural Networks Complete Guide',
    type: 'pdf',
    subject: 'machine-learning',
    status: 'ready',
    uploadDate: '3 days ago',
    size: '1.8 MB',
    progress: 100,
  },
  {
    id: 5,
    title: 'Cell Biology and Molecular Mechanisms',
    type: 'pdf',
    subject: 'biology',
    status: 'ready',
    uploadDate: '5 days ago',
    size: '3.1 MB',
    progress: 100,
  },
  {
    id: 6,
    title: 'Advanced Data Structures in Python Programming',
    type: 'youtube',
    subject: 'computer-science',
    status: 'ready',
    uploadDate: '2 days ago',
    duration: '22:15',
    progress: 100,
    url: 'https://youtube.com',
  },
];

// --- MAIN COMPONENT ---
export default function ResourcesPage() {
  const [resourceList, setResourceList] = useState<Resource[]>(initialResources);
  const [activeType, setActiveType] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subject: '',
    notes: '',
    file: null,
    url: '',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    title: '',
    subject: '',
    notes: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setEditFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        file,
        title: file.name.replace(/\.[^/.]+$/, ''),
        url: '',
      }));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({
        ...prev,
        file,
        title: file.name.replace(/\.[^/.]+$/, ''),
        url: '',
      }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const triggerFileInput = () => fileInputRef.current?.click();

  const handleUploadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.subject ||
      (uploadType === 'file' && !formData.file) ||
      (uploadType === 'url' && !formData.url.trim())
    ) {
      alert('Please fill all required fields.');
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newResourceBase = {
      id: Date.now(),
      title: formData.title,
      subject: formData.subject,
      status: 'ready' as const,
      uploadDate: 'Just now',
      progress: 100,
      ...(formData.notes && { notes: formData.notes }),
    };

    let newResource: Resource;
    if (uploadType === 'file' && formData.file) {
      newResource = {
        ...newResourceBase,
        type: formData.file.name.endsWith('.pdf') ? 'pdf' : 'file',
        size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
    } else {
      const isYouTube = formData.url.includes('youtube.com') || formData.url.includes('youtu.be');
      newResource = isYouTube
        ? { ...newResourceBase, type: 'youtube', url: formData.url, duration: 'N/A' }
        : { ...newResourceBase, type: 'web', url: formData.url, wordCount: 'N/A' };
    }

    setResourceList(prev => [newResource, ...prev]);
    setIsProcessing(false);
    setIsUploadOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResourceList(prev => prev.filter(resource => resource.id !== id));
    }
  };

  const handleEditClick = (resource: Resource) => {
    setEditingResource(resource);
    setEditFormData({
      title: resource.title,
      subject: resource.subject,
      notes: resource.notes || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingResource || !editFormData.title.trim() || !editFormData.subject) {
      alert('Please fill all required fields.');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setResourceList(prev => prev.map(r => (r.id === editingResource.id ? { ...r, ...editFormData } : r)));
    setIsProcessing(false);
    setIsEditOpen(false);
    setEditingResource(null);
  };

  useEffect(() => {
    if (!isUploadOpen) {
      setFormData({ title: '', subject: '', notes: '', file: null, url: '' });
      setUploadType('file');
      setIsDragging(false);
    }
  }, [isUploadOpen]);

  const getStatusIcon = useCallback((status: Resource['status']): ReactNode => {
    const statusMap: Record<Resource['status'], ReactNode> = {
      ready: <CheckCircle className="h-4 w-4 text-emerald-400" />,
      processing: <Clock className="h-4 w-4 animate-spin text-blue-400" />,
      failed: <AlertCircle className="h-4 w-4 text-red-400" />,
    };
    return statusMap[status];
  }, []);

  const getStatusText = useCallback((status: Resource['status']): string => {
    const textMap: Record<Resource['status'], string> = {
      ready: 'Ready',
      processing: 'Processing...',
      failed: 'Failed',
    };
    return textMap[status] || 'Unknown';
  }, []);

  const getTypeIcon = useCallback((type: Resource['type']): ReactNode => {
    const iconMap: Partial<Record<Resource['type'], ReactNode>> = {
      pdf: <FileText className="h-8 w-8 text-blue-400" />,
      file: <FileText className="h-8 w-8 text-blue-400" />,
      youtube: <Youtube className="h-8 w-8 text-red-400" />,
      web: <Globe className="h-8 w-8 text-emerald-400" />,
    };
    return iconMap[type] || <FileIcon className="h-8 w-8 text-gray-400" />;
  }, []);

  const filteredResources = resourceList.filter(
    r =>
      (activeType === 'all' || r.type === activeType) &&
      (activeSubject === 'all' || r.subject === activeSubject) &&
      r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Resources', value: resourceList.length, icon: BookOpen, color: 'text-blue-400' },
    {
      label: 'Ready to Study',
      value: resourceList.filter(r => r.status === 'ready').length,
      icon: CheckCircle,
      color: 'text-emerald-400',
    },
    {
      label: 'Processing',
      value: resourceList.filter(r => r.status === 'processing').length,
      icon: Clock,
      color: 'text-amber-400',
    },
    {
      label: 'Added This Week',
      value: resourceList.filter(r => ['day', 'hour', 'now'].some(t => r.uploadDate.includes(t))).length,
      icon: Calendar,
      color: 'text-purple-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  // *** THE FIX: Added 'as const' to give TypeScript specific literal types ***
  const modalContentVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  } as const;

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-transparent to-white/5">
        <AnimatedBackground />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto space-y-8 px-4 py-8 sm:px-6"
      >
        <motion.header variants={itemVariants} className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-slate-800/50 p-8 backdrop-blur-xl">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="space-y-2">
                <h1 className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-4xl font-bold text-transparent">
                  Study Resources
                </h1>
                <p className="text-lg text-gray-400">Organize and manage your learning materials efficiently</p>
              </div>
              <motion.button
                onClick={() => setIsUploadOpen(true)}
                className="group relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-blue-500/30 sm:px-8 sm:py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  <span>Upload Resource</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.header>

        <motion.section variants={itemVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => (
            <motion.div
              key={stat.label}
              className="group relative h-full rounded-2xl border border-white/10 bg-slate-800/50 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-white/10 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-slate-800/50 p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-300 placeholder:text-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <select
                value={activeType}
                onChange={e => setActiveType(e.target.value)}
                className="w-full min-w-[140px] appearance-none rounded-xl border border-white/20 bg-white/5 bg-right-4 bg-no-repeat px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 sm:w-auto"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                }}
              >
                <option value="all" className="bg-slate-900 text-white">
                  All Types
                </option>
                <option value="pdf" className="bg-slate-900 text-white">
                  PDFs
                </option>
                <option value="file" className="bg-slate-900 text-white">
                  Documents
                </option>
                <option value="youtube" className="bg-slate-900 text-white">
                  Videos
                </option>
                <option value="web" className="bg-slate-900 text-white">
                  Articles
                </option>
              </select>
              <select
                value={activeSubject}
                onChange={e => setActiveSubject(e.target.value)}
                className="w-full min-w-[180px] appearance-none rounded-xl border border-white/20 bg-white/5 bg-right-4 bg-no-repeat px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 sm:w-auto"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                }}
              >
                {subjectTypes.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    {s.label} (
                    {s.id === 'all' ? resourceList.length : resourceList.filter(r => r.subject === s.id).length})
                  </option>
                ))}
              </select>
              <div className="flex rounded-xl bg-white/5 p-1">
                <button
                  aria-label="Grid View"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg p-2 transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  aria-label="List View"
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg p-2 transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {filteredResources.length > 0 ? (
          <motion.div
            layout
            className={
              viewMode === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'
            }
          >
            <AnimatePresence>
              {filteredResources.map(resource => (
                <motion.div
                  layout="position"
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -20 }}
                  key={resource.id}
                  className={`group relative rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 ${viewMode === 'grid' ? 'flex flex-col p-5' : 'flex flex-col gap-4 p-4 sm:flex-row sm:items-center'}`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative mb-4">
                        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-700/50 to-slate-800/50">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                          {getStatusIcon(resource.status)}
                          <span>{getStatusText(resource.status)}</span>
                        </div>
                        {resource.status === 'processing' && (
                          <div className="absolute inset-x-2 bottom-2">
                            <div className="h-1.5 w-full rounded-full bg-white/20">
                              <motion.div
                                className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${resource.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="line-clamp-2 h-12 grow font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                        {resource.title}
                      </h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                        <span className="capitalize">{resource.subject.replace(/-/g, ' ')}</span>
                        <span>{resource.uploadDate}</span>
                      </div>
                      <div className="mt-1 h-4 text-xs text-gray-500">
                        {'size' in resource && resource.size}
                        {'duration' in resource && resource.duration}
                        {'wordCount' in resource && resource.wordCount}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-slate-700/50 to-slate-800/50">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                          {resource.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                          <span className="capitalize">{resource.subject.replace(/-/g, ' ')}</span>
                          <span>{resource.uploadDate}</span>
                          <span>
                            {'size' in resource && resource.size}
                            {'duration' in resource && resource.duration}
                            {'wordCount' in resource && resource.wordCount}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-1.5 self-start sm:self-center">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(resource.status)}
                          <span className="hidden text-xs text-gray-400 md:inline">
                            {getStatusText(resource.status)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className={`flex items-center gap-2 ${viewMode === 'grid' ? 'mt-4 justify-between border-t border-white/10 pt-4' : 'mt-4 sm:ml-4 sm:mt-0'}`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="View"
                        onClick={() => alert(`Viewing ${resource.title}`)}
                        className="rounded-lg bg-white/10 p-2 hover:bg-blue-600/20"
                      >
                        <Eye className="h-4 w-4 text-blue-400" />
                      </button>
                      <button
                        aria-label="Edit"
                        onClick={() => handleEditClick(resource)}
                        className="rounded-lg bg-white/10 p-2 hover:bg-emerald-600/20"
                      >
                        <Edit className="h-4 w-4 text-emerald-400" />
                      </button>
                      <button
                        aria-label="Delete"
                        onClick={() => handleDelete(resource.id)}
                        className="rounded-lg bg-white/10 p-2 hover:bg-red-600/20"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                    <button
                      aria-label="More actions"
                      onClick={() => alert(`More for "${resource.title}"`)}
                      className="ml-auto rounded-lg bg-white/10 p-2 hover:bg-white/20 sm:ml-0"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
            <div className="relative mx-auto mb-8 h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                <BookOpen className="h-12 w-12 text-blue-400" />
              </div>
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl"></div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">No Resources Found</h3>
            <p className="mx-auto mb-8 max-w-md text-gray-400">
              {searchQuery || activeType !== 'all' || activeSubject !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Start by uploading a resource.'}
            </p>
            <motion.button
              onClick={() => setIsUploadOpen(true)}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg hover:shadow-blue-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Resource
            </motion.button>
          </motion.div>
        )}

        {/* MODALS using AnimatePresence for enter/exit animations */}
        <AnimatePresence>
          {isUploadOpen && (
            <motion.div
              variants={modalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            >
              <motion.div
                variants={modalContentVariants}
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-slate-800/90 p-8 shadow-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Add New Resource</h2>
                  <motion.button
                    onClick={() => setIsUploadOpen(false)}
                    className="rounded-full p-2 hover:bg-white/10"
                    whileHover={{ rotate: 90 }}
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </motion.button>
                </div>
                <form onSubmit={handleUploadSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1">
                    <button
                      type="button"
                      onClick={() => setUploadType('file')}
                      className={`flex items-center justify-center gap-3 rounded-xl px-6 py-3 transition-all duration-300 ${uploadType === 'file' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      <FileIcon className="h-5 w-5" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadType('url')}
                      className={`flex items-center justify-center gap-3 rounded-xl px-6 py-3 transition-all duration-300 ${uploadType === 'url' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      <LinkIcon className="h-5 w-5" />
                      <span>Add URL</span>
                    </button>
                  </div>
                  {uploadType === 'file' ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        File <span className="text-red-400">*</span>
                      </label>
                      <div
                        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${isDragging ? 'border-blue-400 bg-blue-400/10' : 'border-white/30 bg-slate-700/50 hover:border-blue-400/50 hover:bg-slate-700'}`}
                        onClick={triggerFileInput}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                      >
                        {formData.file ? (
                          <div>
                            <FileText className="mx-auto mb-3 h-10 w-10 text-blue-400" />
                            <p className="break-all font-medium text-white">{formData.file.name}</p>
                            <p className="mt-1 text-sm text-gray-400">{`${(formData.file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setFormData(p => ({ ...p, file: null, title: '' }));
                              }}
                              className="mt-3 text-sm text-red-400 hover:underline"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                            <p className="font-semibold text-white">
                              {isDragging ? 'Drop file here' : 'Drag & drop or click to browse'}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">PDF, DOCX, TXT, etc.</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label htmlFor="url" className="text-sm font-medium text-gray-300">
                        Resource URL <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <LinkIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="url"
                          name="url"
                          type="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          placeholder="https://youtube.com/watch?v=..."
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-300">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Introduction to Quantum Physics"
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 bg-right-4 bg-no-repeat px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        }}
                      >
                        <option value="" disabled className="bg-slate-900">
                          Select a subject
                        </option>
                        {subjectTypes
                          .filter(s => s.id !== 'all')
                          .map(s => (
                            <option key={s.id} value={s.id} className="bg-slate-900">
                              {s.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-300">
                        Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Add a short description or key takeaways..."
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
                    <motion.button
                      type="button"
                      onClick={() => setIsUploadOpen(false)}
                      disabled={isProcessing}
                      className="rounded-xl bg-white/10 px-6 py-2 font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-50"
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        'Add Resource'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {isEditOpen && editingResource && (
            <motion.div
              variants={modalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            >
              <motion.div
                variants={modalContentVariants}
                className="w-full max-w-2xl rounded-3xl border border-white/20 bg-slate-800/90 p-8 shadow-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Edit Resource</h2>
                  <motion.button
                    onClick={() => setIsEditOpen(false)}
                    className="rounded-full p-2 hover:bg-white/10"
                    whileHover={{ rotate: 90 }}
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </motion.button>
                </div>
                <form onSubmit={handleUpdateSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="edit-title" className="mb-2 block text-sm font-medium text-gray-300">
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="edit-title"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditInputChange}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-subject" className="mb-2 block text-sm font-medium text-gray-300">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="edit-subject"
                      name="subject"
                      value={editFormData.subject}
                      onChange={handleEditInputChange}
                      required
                      className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 bg-right-4 bg-no-repeat px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      }}
                    >
                      <option value="" disabled className="bg-slate-900">
                        Select a subject
                      </option>
                      {subjectTypes
                        .filter(s => s.id !== 'all')
                        .map(s => (
                          <option key={s.id} value={s.id} className="bg-slate-900">
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-notes" className="mb-2 block text-sm font-medium text-gray-300">
                      Notes
                    </label>
                    <textarea
                      id="edit-notes"
                      name="notes"
                      value={editFormData.notes}
                      onChange={handleEditInputChange}
                      rows={3}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    />
                  </div>
                  <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
                    <motion.button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      disabled={isProcessing}
                      className="rounded-xl bg-white/10 px-6 py-2 font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-50"
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 font-semibold text-white disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
