'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Brain,
  Download,
  Trash2,
  Save,
  Camera,
  Mail,
  Globe,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Monitor,
  BarChart3,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, FormEvent } from 'react';

const settingSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'ai', label: 'AI Preferences', icon: Brain },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    profile: {
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      avatar: null,
      timezone: 'UTC-5',
      language: 'English',
    },
    notifications: {
      email: true,
      push: true,
      studyReminders: true,
      goalUpdates: true,
      weeklyReports: false,
      aiInsights: true,
    },
    appearance: {
      theme: 'dark',
      accentColor: '#3A8EF6',
      fontSize: 'medium',
      animations: true,
    },
    ai: {
      personality: 'friendly',
      responseLength: 'medium',
      learningMode: 'adaptive',
      voiceEnabled: false,
      autoSuggestions: true,
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      aiMemory: true,
      publicProfile: false,
    },
  });

  // Made the update function more type-safe to work with different kinds of settings
  const updateSetting = (section: keyof typeof settings, key: string, value: string | boolean | null) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would save the settings to a server here.
    console.log('Settings saved:', settings);
    alert('Settings have been saved!');
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Profile Information</h3>

      {/* Avatar Upload */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
            <User className="h-10 w-10 text-white" />
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#5CF4A0] transition-colors hover:bg-[#4ade80]"
            aria-label="Upload new profile picture"
          >
            <Camera className="h-3 w-3 text-white" />
          </button>
        </div>
        <div>
          <h4 className="font-medium text-white">Profile Picture</h4>
          <p className="text-sm text-[#A0A6B2]">Upload a new avatar for your profile</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="profileName" className="mb-2 block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            id="profileName"
            type="text"
            value={settings.profile.name}
            onChange={e => updateSetting('profile', 'name', e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-[#A0A6B2] transition-colors focus:border-[#3A8EF6]/50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="profileEmail" className="mb-2 block text-sm font-medium text-white">
            Email Address
          </label>
          <input
            id="profileEmail"
            type="email"
            value={settings.profile.email}
            onChange={e => updateSetting('profile', 'email', e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-[#A0A6B2] transition-colors focus:border-[#3A8EF6]/50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="profileTimezone" className="mb-2 block text-sm font-medium text-white">
            Timezone
          </label>
          <select
            id="profileTimezone"
            value={settings.profile.timezone}
            onChange={e => updateSetting('profile', 'timezone', e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#3A8EF6]/50 focus:outline-none"
          >
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC-6">Central Time (UTC-6)</option>
            <option value="UTC-7">Mountain Time (UTC-7)</option>
            <option value="UTC-8">Pacific Time (UTC-8)</option>
          </select>
        </div>
        <div>
          <label htmlFor="profileLanguage" className="mb-2 block text-sm font-medium text-white">
            Language
          </label>
          <select
            id="profileLanguage"
            value={settings.profile.language}
            onChange={e => updateSetting('profile', 'language', e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-[#3A8EF6]/50 focus:outline-none"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Notification Preferences</h3>

      <div className="space-y-4">
        {[
          {
            key: 'email',
            label: 'Email Notifications',
            desc: 'Receive updates via email',
            icon: Mail,
          },
          {
            key: 'push',
            label: 'Push Notifications',
            desc: 'Browser and mobile notifications',
            icon: Smartphone,
          },
          {
            key: 'studyReminders',
            label: 'Study Reminders',
            desc: 'Daily study session reminders',
            icon: Bell,
          },
          {
            key: 'goalUpdates',
            label: 'Goal Updates',
            desc: 'Progress updates on your goals',
            icon: User,
          },
          {
            key: 'weeklyReports',
            label: 'Weekly Reports',
            desc: 'Weekly learning summary reports',
            icon: Download,
          },
          {
            key: 'aiInsights',
            label: 'AI Insights',
            desc: 'Personalized learning insights',
            icon: Brain,
          },
          // CORRECTED: Added 'as const' to help TypeScript understand the key is a specific literal ('email', 'push', etc.), not a generic string.
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-[#3A8EF6]" />
              <div>
                <div className="font-medium text-white">{item.label}</div>
                <div className="text-sm text-[#A0A6B2]">{item.desc}</div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={!!settings.notifications[item.key as keyof typeof settings.notifications]}
              onClick={() =>
                updateSetting(
                  'notifications',
                  item.key,
                  !settings.notifications[item.key as keyof typeof settings.notifications]
                )
              }
              className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                settings.notifications[item.key as keyof typeof settings.notifications]
                  ? 'bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]'
                  : 'bg-white/20'
              }`}
            >
              <span className="sr-only">{item.label}</span>
              <div
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                  settings.notifications[item.key as keyof typeof settings.notifications] ? 'left-7' : 'left-1'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Appearance Settings</h3>

      {/* Theme Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-white">Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Monitor },
          ].map(themeOption => (
            <button
              key={themeOption.value}
              type="button"
              onClick={() => setTheme(themeOption.value)}
              className={`flex items-center gap-2 rounded-xl border p-3 transition-all duration-300 ${
                theme === themeOption.value
                  ? 'border-[#3A8EF6] bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                  : 'border-white/20 bg-white/5 text-[#A0A6B2] hover:bg-white/10'
              }`}
            >
              <themeOption.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <label className="mb-3 block text-sm font-medium text-white">Accent Color</label>
        <div className="grid grid-cols-6 gap-3">
          {['#3A8EF6', '#6B46C1', '#5CF4A0', '#F97316', '#EF4444', '#8B5CF6'].map(color => (
            <button
              key={color}
              type="button"
              onClick={() => updateSetting('appearance', 'accentColor', color)}
              className={`h-12 w-12 rounded-xl border-2 transition-all duration-300 ${
                settings.appearance.accentColor === color ? 'scale-110 border-white' : 'border-white/20 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Set accent color to ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="mb-3 block text-sm font-medium text-white">Font Size</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ].map(size => (
            <button
              key={size.value}
              type="button"
              onClick={() => updateSetting('appearance', 'fontSize', size.value)}
              className={`rounded-xl border p-3 transition-all duration-300 ${
                settings.appearance.fontSize === size.value
                  ? 'border-[#3A8EF6] bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                  : 'border-white/20 bg-white/5 text-[#A0A6B2] hover:bg-white/10'
              }`}
            >
              <span className="text-sm font-medium">{size.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAISection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">AI Preferences</h3>

      <div className="space-y-6">
        {/* AI Personality */}
        <div>
          <label className="mb-3 block text-sm font-medium text-white">AI Personality</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'friendly', label: 'Friendly' },
              { value: 'professional', label: 'Professional' },
              { value: 'casual', label: 'Casual' },
            ].map(personality => (
              <button
                key={personality.value}
                type="button"
                onClick={() => updateSetting('ai', 'personality', personality.value)}
                className={`rounded-xl border p-3 transition-all duration-300 ${
                  settings.ai.personality === personality.value
                    ? 'border-[#3A8EF6] bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                    : 'border-white/20 bg-white/5 text-[#A0A6B2] hover:bg-white/10'
                }`}
              >
                <span className="text-sm font-medium">{personality.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Response Length */}
        <div>
          <label className="mb-3 block text-sm font-medium text-white">Response Length</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'short', label: 'Concise' },
              { value: 'medium', label: 'Balanced' },
              { value: 'long', label: 'Detailed' },
            ].map(length => (
              <button
                key={length.value}
                type="button"
                onClick={() => updateSetting('ai', 'responseLength', length.value)}
                className={`rounded-xl border p-3 transition-all duration-300 ${
                  settings.ai.responseLength === length.value
                    ? 'border-[#3A8EF6] bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                    : 'border-white/20 bg-white/5 text-[#A0A6B2] hover:bg-white/10'
                }`}
              >
                <span className="text-sm font-medium">{length.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Features */}
        <div className="space-y-4">
          {[
            {
              key: 'voiceEnabled',
              label: 'Voice Responses',
              desc: 'Enable AI voice responses',
              icon: Volume2,
            },
            {
              key: 'autoSuggestions',
              label: 'Auto Suggestions',
              desc: 'Show suggested questions',
              icon: Brain,
            },
            // CORRECTED: Added type assertion to fix index signature error
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-[#3A8EF6]" />
                <div>
                  <div className="font-medium text-white">{item.label}</div>
                  <div className="text-sm text-[#A0A6B2]">{item.desc}</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={!!settings.ai[item.key as keyof typeof settings.ai]}
                onClick={() => updateSetting('ai', item.key, !settings.ai[item.key as keyof typeof settings.ai])}
                className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                  settings.ai[item.key as keyof typeof settings.ai]
                    ? 'bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]'
                    : 'bg-white/20'
                }`}
              >
                <span className="sr-only">{item.label}</span>
                <div
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                    settings.ai[item.key as keyof typeof settings.ai] ? 'left-7' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Privacy & Security</h3>

      <div className="space-y-6">
        {/* Privacy Settings */}
        <div className="space-y-4">
          {[
            {
              key: 'dataCollection',
              label: 'Data Collection',
              desc: 'Allow data collection for service improvement',
              icon: Shield,
            },
            {
              key: 'analytics',
              label: 'Usage Analytics',
              desc: 'Share anonymous usage data',
              icon: BarChart3,
            },
            {
              key: 'aiMemory',
              label: 'AI Memory',
              desc: 'Allow AI to remember conversation context',
              icon: Brain,
            },
            {
              key: 'publicProfile',
              label: 'Public Profile',
              desc: 'Make your profile visible to others',
              icon: Globe,
            },
            // CORRECTED: Added type assertion to fix index signature error
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-[#3A8EF6]" />
                <div>
                  <div className="font-medium text-white">{item.label}</div>
                  <div className="text-sm text-[#A0A6B2]">{item.desc}</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={!!settings.privacy[item.key as keyof typeof settings.privacy]}
                onClick={() =>
                  updateSetting('privacy', item.key, !settings.privacy[item.key as keyof typeof settings.privacy])
                }
                className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                  settings.privacy[item.key as keyof typeof settings.privacy]
                    ? 'bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]'
                    : 'bg-white/20'
                }`}
              >
                <span className="sr-only">{item.label}</span>
                <div
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                    settings.privacy[item.key as keyof typeof settings.privacy] ? 'left-7' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Data Management</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <Download className="h-5 w-5 text-[#3A8EF6]" />
              <div className="text-left">
                <div className="font-medium text-white">Export Data</div>
                <div className="text-sm text-[#A0A6B2]">Download your data</div>
              </div>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 transition-colors hover:bg-red-500/20"
            >
              <Trash2 className="h-5 w-5 text-red-400" />
              <div className="text-left">
                <div className="font-medium text-red-400">Delete Account</div>
                <div className="text-sm text-[#A0A6B2]">Permanently delete</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'appearance':
        return renderAppearanceSection();
      case 'ai':
        return renderAISection();
      case 'privacy':
        return renderPrivacySection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-[#A0A6B2]">Customize your StudySphere experience</p>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl">
            <nav className="space-y-2">
              {settingSections.map(section => (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                      : 'text-[#A0A6B2] hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          {/* CORRECTED: Changed this 'div' to a 'form' and added an 'onSubmit' handler to make the 'Save Changes' button functional. */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl"
          >
            {renderSection()}

            {/* Save Button */}
            <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
              <motion.button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-[#2563eb] hover:to-[#5b21b6] hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="h-5 w-5" />
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
