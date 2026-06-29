import React from "react";
import Link from "next/link";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Extracted metadata outside component
const BLOG_METADATA = {
  title: "I Accidentally Deleted the SSH Key to My EC2 Instance. Now What?",
  date: "June 29, 2026",
  readTime: "6 min read",
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const resolvedParams = await params;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-12 sm:py-24 px-4 sm:px-6 md:px-8">
      <article className="w-full max-w-7xl mx-auto border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-4 sm:p-8 md:p-20 shadow-2xl flex flex-col justify-center">
        {/* Navigation Toolbar */}
        <Link
          href="/#blogSection"
          className="inline-flex items-center gap-2 text-xl text-white/60 hover:text-white transition-colors mb-16 group self-start"
          aria-label="Back to portfolio"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <span>Back to Portfolio</span>
        </Link>

        {/* Article Meta Header */}
        <header className="space-y-4 mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
            {BLOG_METADATA.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-base sm:text-lg font-mono text-white/60 pt-4">
            <time dateTime="2026-06-29">Published: {BLOG_METADATA.date}</time>
            <span aria-hidden="true">•</span>
            <span>Read Time: {BLOG_METADATA.readTime}</span>
            <span aria-hidden="true">•</span>
          </div>
        </header>

        {/* Main Content Body */}
        <div className="space-y-12 sm:space-y-14 text-white leading-relaxed text-lg sm:text-xl md:text-2xl border-t border-white/5 pt-10 sm:pt-14">
          {/* Section: The Accident */}
          <section className="space-y-5 sm:space-y-6">
            <p>
              So, a couple of days ago, I decided to do a massive cleanup of my
              local machine. I was deleting old folders, clearing out junk, and
              organizing my directories. It felt great at the moment, but some
              days later, reality hit.
            </p>
            <p>
              I opened up my laptop, ready to dive back into my work on an EC2
              instance where I had some solid progress going. I typed out my
              standard{" "}
              <code className="bg-white/10 text-purple-300 px-2 py-0.5 rounded font-mono text-base sm:text-lg">
                ssh
              </code>{" "}
              sequence, hit Enter, and nothing happened. The terminal just hung
              there before spitting out a connection timeout.
            </p>
            <p>
              Then I realized during my cleanup streak, I had accidentally
              deleted the{" "}
              <code className="bg-white/10 text-purple-300 px-2 py-0.5 rounded font-mono text-base sm:text-lg">
                .pem
              </code>{" "}
              private key file for that server from my local computer. I was
              completely locked out of my own instance, and all my work was
              trapped inside.
            </p>
          </section>

          {/* Section: Roadblocks */}
          <section className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-10 sm:mt-12">
              // Why I couldn't just use another way in
            </h2>
            <p>
              My first thought was to find an easy workaround through the AWS
              browser console. But since I was running a standard{" "}
              <strong>Ubuntu</strong> image, things weren't that simple.
            </p>
            <p>
              First, even though modern Ubuntu AMIs actually do come with the
              AWS Systems Manager (SSM) agent pre-installed, it was completely
              useless to me here. Why? Because I hadn't attached an IAM instance
              profile role to the server to grant SSM permission to talk to the
              AWS backend. Second, EC2 Instance Connect wasn't an option either
              because my security groups and subnet configurations were locked
              down strictly for standard inbound SSH traffic on port 22 from my
              own IP address.
            </p>
            <p>
              There were no backdoors or pre-installed monitoring agents
              listening for AWS browser tools. I needed standard SSH access, it
              was the only doorway I had left open into the system, and right
              now, I didn't have the key to open it.
            </p>
          </section>

          {/* Section: AWS Constraints */}
          <section className="space-y-5 sm:space-y-6 hidden sm:block">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-10 sm:mt-12">
              // The AWS Constraint
            </h2>
            <p>
              I figured, &quot;No big deal, I&apos;ll just go to the AWS console, make a
              new key pair, and attach it.&quot; But if you&apos;ve messed around with AWS
              enough, you know they don&apos;t let you do that.
            </p>
            <blockquote className="border-l-4 border-purple-500/40 pl-6 sm:pl-8 italic text-white text-lg sm:text-xl my-6 sm:my-8 bg-white/[0.01] py-4 sm:py-6 pr-4 sm:pr-6 rounded-r-xl">
              For security reasons, AWS only injects the public key once into
              the server&apos;s backend file system when you first launch the
              instance. If you lose it from your local machine, the AWS console
              won&apos;t let you just generate a new one for an existing server.
            </blockquote>
            <p>
              Instead of giving up and nuking the instance to start over, I
              decided to perform an infrastructure workaround: a physical root
              volume swap.
            </p>
          </section>

          {/* Mobile AWS Constraint - Simplified */}
          <section className="space-y-4 sm:hidden">
            <h2 className="text-2xl font-black text-white tracking-tight">
              // The AWS Constraint
            </h2>
            <blockquote className="border-l-4 border-purple-500/40 pl-4 italic text-white text-base bg-white/[0.01] py-4 pr-3 rounded-r-xl">
              AWS only injects the public key once when you launch the instance.
              You can&apos;t generate a new one for an existing server.
            </blockquote>
            <p className="text-base">
              Instead of starting over, I performed a root volume swap.
            </p>
          </section>

          {/* Topology Diagram - Hidden on Mobile */}
          <section className="space-y-4 hidden sm:block">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-purple-400">
              // Topology Mapping: Visualized Recovery Sequence
            </span>
            <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-around font-mono text-sm sm:text-base shadow-inner">
              {/* Server A */}
              <div className="border border-red-500/20 bg-red-500/[0.02] p-4 sm:p-6 rounded-xl text-center w-full max-w-[180px] sm:max-w-[220px] shadow-lg">
                <p className="text-red-400 text-xl sm:text-2xl font-black mb-1">
                  Server A
                </p>
                <p className="text-white/60 text-xs sm:text-sm">
                  Locked Instance
                </p>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 text-xs sm:text-sm text-white/60">
                  Status:{" "}
                  <span className="text-red-400 font-bold">Stopped</span>
                </div>
              </div>

              {/* Action Vectors 1 */}
              <div className="hidden md:flex flex-col items-center text-center text-xs sm:text-sm text-white/60 w-full max-w-[140px] sm:max-w-[180px] space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-black">
                  <span aria-hidden="true">◀</span>
                  <span className="h-[1px] w-12 sm:w-20 bg-purple-500/40 inline-block" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">
                    Graft Root
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-400 font-black">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">
                    Detach
                  </span>
                  <span className="h-[1px] w-12 sm:w-20 bg-blue-500/40 inline-block" />
                  <span aria-hidden="true">▶</span>
                </div>
              </div>

              {/* EBS Volume Centerpiece */}
              <div className="border border-purple-500/30 bg-purple-500/[0.05] p-4 sm:p-6 rounded-xl text-center w-full max-w-[220px] sm:max-w-[280px] shadow-xl shadow-purple-500/10 border-dashed">
                <p className="text-purple-300 text-lg sm:text-xl font-black mb-1">
                  EBS Root Volume
                </p>
                <p className="text-purple-300 text-xs sm:text-sm font-mono">
                  /dev/xvda
                </p>
                <div className="mt-4 sm:mt-5 text-xs sm:text-sm text-white/80 bg-black/50 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-white/5 leading-relaxed">
                  Contains: <br />
                  <span className="text-purple-300 font-mono text-[10px] sm:text-xs">
                    ubuntu/.ssh/authorized_keys
                  </span>
                </div>
              </div>

              {/* Action Vectors 2 */}
              <div className="hidden md:flex flex-col items-center text-center text-xs sm:text-sm text-white/60 w-full max-w-[140px] sm:max-w-[180px] space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-black">
                  <span aria-hidden="true">◀</span>
                  <span className="h-[1px] w-12 sm:w-20 bg-blue-500/40 inline-block" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">
                    Mount Unit
                  </span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 font-black">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">
                    Inject Key
                  </span>
                  <span className="h-[1px] w-12 sm:w-20 bg-purple-500/40 inline-block" />
                  <span aria-hidden="true">▶</span>
                </div>
              </div>

              {/* Server B */}
              <div className="border border-green-500/20 bg-green-500/[0.02] p-4 sm:p-6 rounded-xl text-center w-full max-w-[180px] sm:max-w-[220px] shadow-lg">
                <p className="text-green-400 text-xl sm:text-2xl font-black mb-1">
                  Server B
                </p>
                <p className="text-white/60 text-xs sm:text-sm">
                  Rescue Helper
                </p>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 text-xs sm:text-sm text-green-300 font-bold">
                  Active working .pem
                </div>
              </div>

              {/* Mobile Action Indicators */}
              <div className="flex md:hidden w-full justify-between text-[10px] text-white/60 font-mono px-2">
                <span className="text-purple-400">◀ Graft Root</span>
                <span className="text-blue-400">Detach ▶</span>
                <span className="text-blue-400">◀ Mount</span>
                <span className="text-purple-400">Inject Key ▶</span>
              </div>
            </div>
          </section>

          {/* Rescue Steps - Diagrams hidden on mobile */}
          <section className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-10 sm:mt-12">
              // The Rescue Operation Step-by-Step
            </h2>
            <p className="text-lg sm:text-xl">
              Since I couldn&apos;t fix the files from inside the server, I had to
              find a way to edit its hard drive from the outside. Here is
              exactly how I pulled off the operation:
            </p>

            <div className="space-y-8 sm:space-y-12 border-l-2 border-white/5 pl-4 sm:pl-8 md:pl-16 ml-0 sm:ml-1">
              {/* Step 1 */}
              <div className="relative space-y-4 sm:space-y-6">
                <div
                  className="absolute -left-[21px] sm:-left-[41px] md:-left-[73px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a0a0f] border-2 border-purple-500"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Step 1: Stopping the main server
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white mt-2">
                    I went to my AWS Console and stopped my locked instance (
                    <strong>Server A</strong>). AWS protects volumes that are
                    actively running, meaning you cannot detach a root operating
                    system drive while the server is powered on.
                  </p>
                </div>

                {/* Step Diagram 1 - Hidden on Mobile */}
                <div className="w-full bg-white/[0.01] border border-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2 shadow-md hidden sm:flex">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                      aria-hidden="true"
                    />
                    <span className="text-white/60">State:</span>
                    <span className="text-red-400 font-bold">RUNNING</span>
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ─────▶
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full bg-neutral-600"
                      aria-hidden="true"
                    />
                    <span className="text-white/60">Action:</span>
                    <span className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/5 text-[10px] sm:text-xs">
                      Stop Node
                    </span>
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ─────▶
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full bg-green-500"
                      aria-hidden="true"
                    />
                    <span className="text-white/60">Target:</span>
                    <span className="text-green-400 font-bold">STOPPED</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative space-y-4 sm:space-y-6">
                <div
                  className="absolute -left-[21px] sm:-left-[41px] md:-left-[73px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a0a0f] border-2 border-purple-500"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Step 2: Unplugging the virtual storage
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white mt-2">
                    Once it stopped, I opened the left sidebar, went to the{" "}
                    <strong>Volumes</strong> tab, and found the main drive
                    attached to my server. I took a precise note of its target
                    block mapping slot name:{" "}
                    <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                      /dev/xvda
                    </code>
                    . I then clicked <strong>Actions - Detach Volume</strong>
                    .
                  </p>
                </div>

                {/* Step Diagram 2 - Hidden on Mobile */}
                <div className="w-full bg-white/[0.01] border border-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2 shadow-md hidden sm:flex">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-base sm:text-lg">
                      Server A
                    </span>
                  </div>
                  <div className="text-red-400 font-bold text-xs sm:text-sm px-1 sm:px-2">
                    [X] Unlink
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 px-2 sm:px-3 py-1 rounded-lg text-purple-300 font-bold text-[10px] sm:text-xs">
                    EBS: /dev/xvda
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ──────▶
                  </div>
                  <div className="text-yellow-400 font-medium bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded text-[10px] sm:text-xs">
                    Unattached
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative space-y-4 sm:space-y-6">
                <div
                  className="absolute -left-[21px] sm:-left-[41px] md:-left-[73px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a0a0f] border-2 border-purple-500"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Step 3: Setting up a rescue helper
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white mt-2">
                    Next, I launched a brand new, temporary t2.micro instance (
                    <strong>Server B</strong>). Crucially, I made sure to launch
                    it in the <strong>exact same Availability Zone</strong>{" "}
                    (e.g., ap-south-1a) as my detached volume, because EBS
                    volumes cannot cross data centers. I created a fresh key
                    pair named{" "}
                    <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                      rescue-key.pem
                    </code>{" "}
                    for it.
                  </p>
                </div>

                {/* Step Diagram 3 - Hidden on Mobile */}
                <div className="w-full bg-white/[0.01] border border-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2 shadow-md hidden sm:flex">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 text-[10px] sm:text-xs">
                      Zone:
                    </span>
                    <span className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/5 text-[10px] sm:text-xs">
                      ap-south-1a
                    </span>
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ────▶
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-base sm:text-lg">
                      Server B
                    </span>
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ────▶
                  </div>
                  <div className="text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 text-[10px] sm:text-xs">
                    rescue-key.pem
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative space-y-4 sm:space-y-6">
                <div
                  className="absolute -left-[21px] sm:-left-[41px] md:-left-[73px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a0a0f] border-2 border-purple-500"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Step 4: Connecting the drive to the helper
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white mt-2">
                    I attached the detached volume from Server A to the new
                    Server B as a secondary data drive, mapping it to an
                    available block slot name like{" "}
                    <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                      /dev/sdf
                    </code>
                    .
                  </p>
                </div>

                {/* Step Diagram 4 - Hidden on Mobile */}
                <div className="w-full bg-white/[0.01] border border-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2 shadow-md hidden sm:flex">
                  <div className="text-purple-300 font-bold bg-purple-500/10 border border-purple-500/20 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs">
                    Floating Volume
                  </div>
                  <div className="text-green-400 font-medium text-[10px] sm:text-xs px-1 sm:px-2">
                    (Plug In)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-base sm:text-lg">
                      Server B
                    </span>
                  </div>
                  <div
                    className="text-white/20 font-light hidden sm:block"
                    aria-hidden="true"
                  >
                    ────▶
                  </div>
                  <div className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/5 text-[10px] sm:text-xs font-bold">
                    Slot: /dev/sdf (OS maps as /dev/xvdf)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Directory Structural Layout Mapping Panel */}
          <section className="space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-purple-400">
              // Mount Tree Directory Mapping
            </span>
            <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 font-mono text-sm sm:text-base shadow-inner">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 sm:pb-6 gap-2">
                <span className="text-green-400 font-bold text-base sm:text-xl">
                  Rescue Node Environment (Server B)
                </span>
                <span className="text-white/60 text-xs sm:text-sm">
                  Active SSH Terminal Session
                </span>
              </div>

              <div className="space-y-4 sm:space-y-6 pl-1 sm:pl-2">
                {/* Mount line command */}
                <div className="text-white text-sm sm:text-base md:text-xl bg-black/50 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/5 shadow-inner overflow-x-auto">
                  <span className="text-purple-400 font-bold">$</span> sudo
                  mount /dev/xvdf1 /mnt/rescue
                </div>

                {/* Directory Visual Map Layout */}
                <div className="border-l-2 border-dashed border-white/10 pl-4 sm:pl-6 md:pl-10 space-y-3 sm:space-y-4 pt-3 sm:pt-4 text-sm sm:text-base md:text-xl">
                  <div className="text-white font-bold text-sm sm:text-base md:text-xl">
                    📁 /mnt/rescue{" "}
                    <span className="text-[10px] sm:text-xs md:text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 sm:px-3 py-1 rounded-lg ml-1 sm:ml-2 font-normal">
                      (Mounted Target Partition Root)
                    </span>
                  </div>
                  <div className="pl-4 sm:pl-6 md:pl-8 text-white text-xs sm:text-sm md:text-base">
                    └── 📁 home
                  </div>
                  <div className="pl-8 sm:pl-12 md:pl-16 text-white text-xs sm:text-sm md:text-base">
                    └── 📁 ubuntu
                  </div>
                  <div className="pl-12 sm:pl-18 md:pl-24 text-white text-xs sm:text-sm md:text-base">
                    └── 📁 .ssh
                  </div>
                  <div className="pl-16 sm:pl-24 md:pl-32 bg-purple-500/10 border border-purple-500/20 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl block max-w-5xl text-purple-300 shadow-2xl">
                    <div className="font-bold text-purple-200 text-sm sm:text-base md:text-xl">
                      └── 📄 authorized_keys
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Script Commands */}
          <section className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-10 sm:mt-12">
              // Step 5: Mount and Swap Execution
            </h3>

            <p className="text-base sm:text-lg md:text-xl">
              Now came the critical part. I needed to access the locked server&apos;s
              hard drive through my temporary helper server. I connected to
              Server B using SSH with my new rescue key, just like I normally
              would with any EC2 instance.
            </p>

            <p className="text-base sm:text-lg md:text-xl">
              Once I was inside Server B, I needed to see what storage devices
              were attached. I ran the{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                lsblk
              </code>{" "}
              command, which lists all available disk drives and their
              partitions. This confirmed that my original server&apos;s root volume
              was sitting there as an unmounted device at{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                /dev/xvdf1
              </code>
              .
            </p>

            <p className="text-base sm:text-lg md:text-xl">
              Think of it like plugging a USB drive into your computer. The
              drive is physically connected, but you can&apos;t access its files
              until you mount it to a folder. I needed to create a mount point
              (a folder where the drive would be accessible) and then mount the
              volume.
            </p>

            <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-purple-300 font-bold text-lg sm:text-xl mb-2">
                📌 Nitro Instance Note
              </p>
              <p className="text-white/80 text-base sm:text-lg md:text-xl">
                If your rescue server or original server is a newer AWS
                generation (like T3, T3a, M5, or C5), AWS exposes these drives
                as NVMe devices. Instead of /dev/xvdf1, running lsblk will show
                your drive as something like /dev/nvme1n1p1. If that&apos;s the case
                for you, just swap the drive name in the commands below!
              </p>
            </div>

            <p className="text-base sm:text-lg md:text-xl">
              Here&apos;s exactly what I typed into the terminal:
            </p>

            <pre className="bg-black/60 border border-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 font-mono text-sm sm:text-base md:text-xl text-purple-300 overflow-x-auto leading-relaxed shadow-lg">
              {`# First, create a directory where we'll access the locked server's files
sudo mkdir /mnt/rescue

# Now mount the locked server's root volume to that directory
sudo mount /dev/xvdf1 /mnt/rescue

# Navigate into the locked server's SSH configuration folder
cd /mnt/rescue/home/ubuntu/.ssh/

# Open the authorized_keys file to add our new public key
sudo nano authorized_keys

# Fix ownership and permissions to ensure SSH daemon doesn't reject it
sudo chown 1000:1000 authorized_keys
sudo chmod 600 authorized_keys`}
            </pre>

            <p className="text-base sm:text-lg md:text-xl">
              Let me break down what each command does:
            </p>

            <ul className="list-disc pl-6 sm:pl-8 space-y-3 text-base sm:text-lg md:text-xl text-white">
              <li>
                <strong>sudo mkdir /mnt/rescue</strong> — Creates a new folder
                called &quot;rescue&quot; inside the /mnt directory. This will be our
                window into the locked server.
              </li>
              <li>
                <strong>sudo mount /dev/xvdf1 /mnt/rescue</strong> — Attaches
                the locked server&apos;s root volume to our newly created folder. Now
                we can browse its files just like we&apos;re inside the original
                server.
              </li>
              <li>
                <strong>cd /mnt/rescue/home/ubuntu/.ssh/</strong> — Changes our
                current directory to the SSH configuration folder of the locked
                server. This is where the authorized_keys file lives.
              </li>
              <li>
                <strong>sudo nano authorized_keys</strong> — Opens the
                authorized_keys file in a text editor. This file contains all
                the public keys that are allowed to SSH into the server.
              </li>
              <li>
                <strong>sudo chown 1000:1000 authorized_keys && sudo chmod 600 authorized_keys</strong> — Ensures that the original 
                &apos;ubuntu&apos; user owns the file with strict read/write security permissions. Without this, the SSH daemon on boot will completely reject the connection out of safety paranoia.
              </li>
            </ul>

            <p className="text-base sm:text-lg md:text-xl mt-6">
              Inside the authorized_keys file, I carefully removed the old,
              broken public key that I had lost access to. Then I added the new
              public key that matched my fresh{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                rescue-key.pem
              </code>{" "}
              private key. Think of it like changing the lock on your front door
              — I was giving myself a new key while making sure the old one
              wouldn&apos;t work anymore.
            </p>

            <p className="text-base sm:text-lg md:text-xl">
              After saving the changes and exiting the text editor, I needed to
              clean up properly:
            </p>

            <pre className="bg-black/60 border border-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 font-mono text-sm sm:text-base md:text-xl text-purple-300 overflow-x-auto leading-relaxed shadow-lg">
              {`# Go back to the home directory
cd ~

# Unmount the volume (safely disconnect it)
sudo umount /mnt/rescue

# Exit the SSH session
exit`}
            </pre>

            <p className="text-base sm:text-lg md:text-xl">
              The{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                cd ~
              </code>{" "}
              command takes me out of the mounted filesystem, which is important
              because you can&apos;t unmount a drive while you&apos;re inside it. Then{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                sudo umount /mnt/rescue
              </code>{" "}
              safely disconnects the volume, and{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                exit
              </code>{" "}
              logs me out of Server B.
            </p>
          </section>

          {/* Retrospective Conclusion */}
          <section className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-10 sm:mt-12">
              // Back to Work
            </h2>

            <p className="text-base sm:text-lg md:text-xl">
              With the new public key injected into the locked server&apos;s
              filesystem, I went back to the AWS Console. I detached the volume
              from Server B and reattached it to Server A, making sure to map it
              back to its original root device path:{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                /dev/xvda
              </code>
              .
            </p>

            <p className="text-base sm:text-lg md:text-xl">
              Think of it like this: I had borrowed Server B&apos;s &quot;disk reader&quot; to
              modify the files on my locked hard drive, and now I was putting
              that hard drive back into Server A exactly where it belonged.
            </p>

            <p className="text-base sm:text-lg md:text-xl">
              I started Server A back up and waited patiently for it to boot.
              Once the status lights showed it was running, I tried connecting
              with my new{" "}
              <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded font-mono text-sm sm:text-base">
                rescue-key.pem
              </code>
              . The connection was instant, I was back in!
            </p>

            <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-purple-300 font-bold text-lg sm:text-xl mb-2">
                📌 Key Takeaway
              </p>
              <p className="text-white/80 text-base sm:text-lg md:text-xl">
                The root volume of an EC2 instance is just an EBS block storage
                device that can be detached and attached to other instances. If
                you lose your SSH key, you don&apos;t lose your data — you just need
                to find another way to access the hard drive and update the
                authorized_keys file.
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}