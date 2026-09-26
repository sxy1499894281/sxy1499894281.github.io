import Image from 'next/image';
import { getConfig } from '@/lib/config';

export default function Home() {
  const { author, social } = getConfig();
  return <>
    <header className="topbar"><a className="wordmark" href="#">Xiaoyan Su</a><nav aria-label="Main navigation"><a href="#agentic-aigc">Agentic AIGC</a><a href="#cua-agent">CUA Agent</a><a href="#game-agent">Game Agent</a></nav></header>
    <main id="main" className="layout">
      <aside className="profile" aria-label="Profile">
        <Image className="avatar" src="/assets/avatar.webp" alt="Personal avatar: a white dog wearing glasses at a desk" width={640} height={637} priority />
        <h1>{author.name}</h1>
        <p className="role">{author.title}</p>
        <a className="institution" href="https://hkust-gz.edu.cn/">The Hong Kong University<br/>of Science and Technology<br/>(Guangzhou)</a>
        <p className="shortname">HKUST(GZ)</p>
        <div className="profile-links"><a href={social.github as string}>GitHub</a>{social.google_scholar && <a href={social.google_scholar as string}>Google Scholar</a>}</div>
        <p className="interests">Agentic AIGC<br/>CUA Agent<br/>Game Agent</p>
      </aside>
      <div className="content directions">
        <section id="agentic-aigc" className="direction"><h2><span className="direction-icon" aria-hidden="true">✦</span> Agentic AIGC</h2><div className="subsection-label">Publications</div>
          <article className="paper-card"><p className="venue">ICML 2026 <span className="topic-tag">Benchmark</span></p><h3><a href="https://arxiv.org/abs/2605.15677">VCG-Bench: Towards A Unified Visual-Centric Benchmark for Structured Generation and Editing</a></h3><p className="authors"><strong>Xiaoyan Su</strong>, Peijie Dong, Zhenheng Tang, Song Tang, Yuyao Zhai, Kaitao Lin, Liang Chen, Yuhang Gai, Yuyu Luo, Qiang Wang, Xiaowen Chu</p><div className="resource-links"><a href="https://arxiv.org/abs/2605.15677">Paper</a><a href="https://sxy1499894281.github.io/VCG-Bench/">Project page</a><a href="https://huggingface.co/datasets/sxy1620348809/VCG-Bench">Dataset</a></div></article>
          <div className="subsection-label">GitHub Projects</div><div className="project-list"><Project href="https://github.com/sxy1499894281/VCG-Bench" name="VCG-Bench" stars="5" topic="Benchmark" /><Project href="https://github.com/HKUSTDial/DataMagic" name="DataMagic" stars="266" topic="Agent System" /><Project href="https://github.com/sxy1499894281/drawio-reconstruction-skill" name="Draw.io Reconstruction Skill" stars="28" topic="Agent Skill" /></div>
        </section>
        {([{ id: 'cua-agent', name: 'CUA Agent', icon: '⌘' }, { id: 'game-agent', name: 'Game Agent', icon: '◈' }]).map(direction => <section key={direction.id} id={direction.id} className="direction"><h2><span className="direction-icon" aria-hidden="true">{direction.icon}</span> {direction.name}</h2><div className="subsection-label">Publications</div><div className="empty-slot" /><div className="subsection-label">GitHub Projects</div><div className="empty-slot" /></section>)}
      </div>
    </main>
    <footer><span>© 2026 Xiaoyan Su</span><a href="https://github.com/xyjoey/PRISM">Based on PRISM</a></footer>
  </>;
}

function Project({ href, name, stars, topic }: { href: string; name: string; stars: string; topic: string }) {
  return <a className="project-row" href={href}><span className="project-name">{name}<span className="topic-tag">{topic}</span></span><span className="stars" aria-label={`${stars} GitHub stars`}>★ {stars}</span></a>;
}
