"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiX,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiImage,
} from "react-icons/fi";

import {
  activitiesData,
  ACTIVITY_TYPE_LABELS,
  type Activity,
} from "@/components/data/activities";
import { cn } from "@/lib/utils";
import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

const ACHIEVEMENT_STYLES: Record<string, string> = {
  Winner: "bg-primary/15 text-primary border-primary/30",
  "Runner-up": "bg-primary/10 text-primary border-primary/20",
  Finalist: "bg-muted text-foreground border-border",
  Participant: "bg-muted text-muted-foreground border-border",
  Volunteer: "bg-muted text-muted-foreground border-border",
};

const LinkButton = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-border rounded-none font-medium text-xs sm:text-sm text-foreground hover:bg-muted transition-colors duration-200"
  >
    {icon}
    {label}
  </a>
);

function ActivityCard({
  activity,
  index,
  onOpen,
}: {
  activity: Activity;
  index: number;
  onOpen: () => void;
}) {
  const badgeStyle =
    ACHIEVEMENT_STYLES[activity.achievement ?? "Participant"] ??
    ACHIEVEMENT_STYLES.Participant;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay: index * 0.05 }}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor-hover
        className="relative aspect-video border border-border bg-muted overflow-hidden text-left w-full"
      >
        <Image
          src={activity.coverImage}
          alt={activity.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {activity.achievement && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium border",
              badgeStyle
            )}
          >
            {activity.achievement}
          </span>
        )}
      </button>

      <div className="pt-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
            {ACTIVITY_TYPE_LABELS[activity.type]}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
            {activity.date}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="text-left"
        >
          <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            {activity.title}
          </h3>
        </button>

        <p className="text-xs text-muted-foreground mt-1.5">
          {activity.organizer}
          {activity.location ? ` · ${activity.location}` : ""}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-3">
          {activity.shortDescription}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors duration-200"
        >
          <FiImage size={14} />
          View Gallery
        </button>
      </div>
    </motion.article>
  );
}

function ActivityDetailModal({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const allImages = [
    ...activity.gallery,
    ...(activity.certificateImages ?? []),
  ];

  const nextImage = () =>
    setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const prevImage = () =>
    setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const externalLinks = [
    { href: activity.githubLink, icon: <FiGithub size={16} />, label: "GitHub" },
    { href: activity.demoLink, icon: <FiExternalLink size={16} />, label: "Live Demo" },
    { href: activity.eventWebsite, icon: <FiExternalLink size={16} />, label: "Event Website" },
    { href: activity.devpostLink, icon: <FiExternalLink size={16} />, label: "Devpost" },
    { href: activity.slidesLink, icon: <FiExternalLink size={16} />, label: "Slides" },
    { href: activity.projectLink, icon: <FiExternalLink size={16} />, label: "Project" },
    { href: activity.demoVideoLink, icon: <FiPlay size={16} />, label: "Demo Video" },
  ].filter((link) => link.href);

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-background/90"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={springSnappy}
          className="relative z-[110] w-full max-w-4xl bg-card text-card-foreground border border-border shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="px-5 py-4 border-b border-border flex justify-between items-center sticky top-0 z-50 bg-card">
            <span className="font-mono text-xs text-muted-foreground/70 tracking-wide">
              ACTIVITY DETAIL
            </span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-6">
            {allImages.length > 0 && (
              <>
                <div className="relative aspect-video border border-border bg-muted overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.button
                      key={activeImage}
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                      onClick={() => setLightboxImage(allImages[activeImage])}
                      aria-label="Open image lightbox"
                    >
                      <Image
                        src={allImages[activeImage]}
                        alt={`${activity.title} — image ${activeImage + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 850px"
                        className="object-cover"
                      />
                    </motion.button>
                  </AnimatePresence>

                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border text-foreground hover:bg-background transition-colors duration-200"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft size={18} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border text-foreground hover:bg-background transition-colors duration-200"
                        aria-label="Next image"
                      >
                        <FiChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1.5 lp-scrollbar">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={cn(
                          "relative min-w-[90px] h-[60px] overflow-hidden border transition-opacity duration-200",
                          activeImage === index
                            ? "border-primary opacity-100"
                            : "border-border opacity-50 hover:opacity-90"
                        )}
                      >
                        <Image
                          src={img}
                          alt={`preview-${index}`}
                          fill
                          sizes="90px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
                  {ACTIVITY_TYPE_LABELS[activity.type]}
                </span>
                {activity.achievement && (
                  <span
                    className={cn(
                      "px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium border",
                      ACHIEVEMENT_STYLES[activity.achievement] ??
                        ACHIEVEMENT_STYLES.Participant
                    )}
                  >
                    {activity.achievement}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {activity.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-4 border-y border-border">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                    Organizer
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {activity.organizer}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                    Date
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {activity.date}
                  </p>
                </div>
                {activity.location && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                      Location
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {activity.location}
                    </p>
                  </div>
                )}
                {activity.role && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                      Role
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {activity.role}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                  Description
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.fullDescription}
                </p>
              </div>

              {activity.type === "hackathon" && (
                <div className="space-y-5 pt-2 border-t border-border">
                  <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Hackathon Project
                  </h3>

                  {activity.projectName && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        Project Name
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {activity.projectName}
                      </p>
                    </div>
                  )}

                  {activity.problemStatement && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        Problem Statement
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.problemStatement}
                      </p>
                    </div>
                  )}

                  {activity.solutionOverview && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        Solution Overview
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.solutionOverview}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activity.teamSize && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                          Team Size
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {activity.teamSize} members
                        </p>
                      </div>
                    )}
                    {activity.awards && activity.awards.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                          Awards
                        </p>
                        <ul className="space-y-1">
                          {activity.awards.map((award) => (
                            <li
                              key={award}
                              className="text-sm text-foreground font-medium"
                            >
                              {award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activity.techStack && activity.techStack.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    Technologies
                  </p>
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                    {activity.techStack.join(" / ")}
                  </p>
                </div>
              )}

              {activity.teamMembers && activity.teamMembers.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    Team Members
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.teamMembers.join(" · ")}
                  </p>
                </div>
              )}

              {activity.outcomes && activity.outcomes.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    Achievements & Outcomes
                  </p>
                  <ul className="space-y-2">
                    {activity.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary mt-0.5">—</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activity.timeline && activity.timeline.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                    Event Timeline
                  </p>
                  <div className="space-y-3 border-l border-border pl-4">
                    {activity.timeline.map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {externalLinks.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {externalLinks.map((link) => (
                    <LinkButton
                      key={link.label}
                      href={link.href!}
                      icon={link.icon}
                      label={link.label}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95"
              onClick={() => setLightboxImage(null)}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[130] max-w-5xl w-full max-h-[85vh]"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close lightbox"
              >
                <FiX size={22} />
              </button>
              <div className="relative w-full aspect-video border border-border">
                <Image
                  src={lightboxImage}
                  alt="Gallery lightbox"
                  fill
                  sizes="100vw"
                  className="object-contain bg-muted"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ActivitiesEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springSoft}
      className="mt-8 sm:mt-12 border border-dashed border-border py-16 px-6 text-center"
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
        No activities yet
      </p>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Extra-curricular highlights coming soon
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Hackathons, workshops, competitions, and volunteer work will appear here
        as they are added.
      </p>
    </motion.div>
  );
}

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  return (
    <section
      id="activities"
      className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16"
    >
      <SectionHeader
        kicker="Beyond the classroom"
        title="Extra-Curricular Activities"
      />

      {activitiesData.length === 0 ? (
        <ActivitiesEmptyState />
      ) : (
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12">
          {activitiesData.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              onOpen={() => setSelectedActivity(activity)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetailModal
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
