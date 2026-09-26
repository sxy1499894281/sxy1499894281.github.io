import Image from 'next/image';
import { getConfig } from '@/lib/config';

export default function Home() {
  const { author, social } = getConfig();
  return <>
    <header className="topbar"><a className="wordmark" href="#">Xiaoyan Su</a><nav aria-label="Main navigation"><a href="#multimodal-coding">Multimodal Coding</a><a href="#cua-agent">CUA Agent</a><a href="#game-agent">Game Agent</a></nav></header>
    <main id="main" className="layout">
      <aside className="profile" aria-label="Profile">
        <Image className="avatar" src="/assets/avatar.webp" alt="Personal avatar: a white dog wearing glasses at a desk" width={640} height={637} priority />
        <h1>{author.name}</h1>
        <p className="role">{author.title}</p>
        <a className="institution" href="https://hkust-gz.edu.cn/">The Hong Kong University<br/>of Science and Technology<br/>(Guangzhou)</a>
        <p className="shortname">HKUST(GZ)</p>
        <div className="profile-links"><a href={social.github as string}>GitHub</a>{social.google_scholar && <a href={social.google_scholar as string}>Google Scholar</a>}</div>
        <p className="interests">Multimodal Coding<br/>CUA Agent<br/>Game Agent</p>
      </aside>
      <div className="content directions">
        <section id="multimodal-coding" className="direction"><h2>Multimodal Coding</h2><div className="work-group"><h3 className="subsection-label"><PaperIcon />Publications</h3>
          <article className="paper-card"><p className="venue">ICML 2026 <span className="topic-tag">Benchmark · Diagram2Drawio</span></p><h4 className="paper-title"><a href="https://arxiv.org/abs/2605.15677">VCG-Bench: Towards A Unified Visual-Centric Benchmark for Structured Generation and Editing</a></h4><p className="description">A benchmark for generating and editing structured, executable diagrams with vision-language models.</p><p className="authors"><strong>Xiaoyan Su</strong>, Peijie Dong, Zhenheng Tang, Song Tang, Yuyao Zhai, Kaitao Lin, Liang Chen, Yuhang Gai, Yuyu Luo, Qiang Wang, Xiaowen Chu</p><div className="resource-links"><a href="https://arxiv.org/abs/2605.15677">Paper</a><a href="https://sxy1499894281.github.io/VCG-Bench/">Project page</a><a href="https://huggingface.co/datasets/sxy1620348809/VCG-Bench">Dataset</a></div></article></div>
          <div className="work-group"><h3 className="subsection-label projects-heading"><GitHubIcon />GitHub Projects</h3><div className="project-list"><Project href="https://github.com/sxy1499894281/VCG-Bench" description="Code, dataset, and evaluation tools for structured diagram generation and editing." name="VCG-Bench" stars="5" topic="Benchmark · Diagram2Drawio" /><Project href="https://github.com/HKUSTDial/DataMagic" description="An AI agent system that turns tables into narrated, animated data stories." name="DataMagic" stars="266" topic="Agent System · Remotion Video" /><Project href="https://github.com/sxy1499894281/drawio-reconstruction-skill" description="An agent skill for turning diagram images into editable Draw.io files." name="Draw.io Reconstruction Skill" stars="28" topic="Agent Skill" /></div></div>
        </section>
        {([{ id: 'cua-agent', name: 'CUA Agent' }, { id: 'game-agent', name: 'Game Agent' }]).map(direction => <section key={direction.id} id={direction.id} className="direction"><h2>{direction.name}</h2><div className="work-group"><h3 className="subsection-label"><PaperIcon />Publications</h3><div className="empty-slot" /></div><div className="work-group"><h3 className="subsection-label projects-heading"><GitHubIcon />GitHub Projects</h3><div className="empty-slot" /></div></section>)}
      </div>
    </main>
    <footer><span>© 2026 Xiaoyan Su</span><a href="https://github.com/xyjoey/PRISM">Based on PRISM</a></footer>
  </>;
}

function Project({ href, name, stars, topic, description }: { href: string; name: string; stars: string; topic: string; description: string }) {
  return <article className="project-row"><div className="project-top"><h4><a href={href}><GitHubIcon />{name}</a></h4><a className="stars" href={`${href}/stargazers`} aria-label={`${stars} GitHub stars`} title="Star count checked September 26, 2026"><span aria-hidden="true">★</span> {stars}</a></div><p className="project-description">{description}</p><span className="topic-tag">{topic}</span></article>;
}

function GitHubIcon() {
  return <svg className="inline-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.4-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.54.23 2.69.11 2.97.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.09v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>;
}
function PaperIcon() {
  return <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6" /></svg>;
}
