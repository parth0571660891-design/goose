import { Feather, Heart, Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold text-white">Goose (Hans)</span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              Wildlife Awareness & Care Guide. Dedicated to educating people about the importance of geese in our ecosystems and promoting responsible wildlife conservation.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Wildlife Awareness</h3>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              Protecting wetlands, preserving biodiversity, and fostering a deeper connection between humans and nature through education and awareness.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-emerald-300/80">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>info@gooseawareness.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-300/80">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-300/80">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>www.gooseawareness.org</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-emerald-800/50 text-center">
          <p className="text-xs text-emerald-400/60 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-400" /> for wildlife awareness.
          </p>
          <p className="text-xs text-emerald-400/40 mt-2">
            &copy; {new Date().getFullYear()} Goose (Hans) Wildlife Awareness. All rights reserved. Educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
