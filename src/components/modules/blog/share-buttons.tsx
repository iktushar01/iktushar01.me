"use client";

import { FiLink, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blogs/${slug}`
      : `https://www.iktushar01.me/blogs/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FiTwitter size={16} />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FiLinkedin size={16} />,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FiFacebook size={16} />,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard may be unavailable
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mr-1">
        Share
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="inline-flex items-center justify-center size-9 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex items-center justify-center size-9 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
      >
        <FiLink size={16} />
      </button>
    </div>
  );
}
