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
        <p className="interests">Agentic AIGC<br/>GUI Agent<br/>Game Agent</p>
      </aside>
      <div className="content directions">
        <section id="agentic-aigc" className="direction"><h2><span className="direction-icon" aria-hidden="true">✦</span> Agentic AIGC</h2><div className="subsection-label">Publications</div>
          <article className="paper-card"><p className="venue">ICML 2026</p><h3><a href="https://arxiv.org/abs/2605.15677">VCG-Bench: Towards A Unified Visual-Centric Benchmark for Structured Generation and Editing</a></h3><p className="authors"><strong>Xiaoyan Su</strong>, Peijie Dong, Zhenheng Tang, Song Tang, Yuyao Zhai, Kaitao Lin, Liang Chen, Yuhang Gai, Yuyu Luo, Qiang Wang, Xiaowen Chu</p><div className="resource-links"><a href="https://arxiv.org/abs/2605.15677">Paper</a><a href="https://sxy1499894281.github.io/VCG-Bench/">Project page</a><a href="https://huggingface.co/datasets/sxy1620348809/VCG-Bench">Dataset</a></div></article>
          <div className="subsection-label">GitHub Projects</div><div className="project-list"><Project href="https://github.com/sxy1499894281/VCG-Bench" name="VCG-Bench" stars="5" /><Project href="https://github.com/HKUSTDial/DataMagic" name="DataMagic" stars="266" /><Project href="https://github.com/sxy1499894281/drawio-reconstruction-skill" name="Draw.io Reconstruction Skill" stars="28" /></div>
        </section>
        <section id="cua-agent" className="direction"><h2><span className="direction-icon" aria-hidden="true">⌘</span> CUA Agent</h2><div className="subsection-label">Publications</div><p className="empty-note">Coming soon.</p><div className="subsection-label">GitHub Projects</div><div className="project-list"><Project href="https://github.com/sxy1499894281/AutoAppWorld" name="AutoAppWorld" stars="2" /><Project href="https://github.com/sxy1499894281/agentic_drawio" name="Agentic Draw.io" stars="0" /></div>
        </section>
        <section id="game-agent" className="direction"><h2><span className="direction-icon" aria-hidden="true">◈</span> Game Agent</h2><div className="subsection-label">Publications</div><p className="empty-note">Coming soon.</p><div className="subsection-label">GitHub Projects</div><div className="project-list"><Project href="https://github.com/sxy1499894281/cutscene_agent" name="Cutscene Agent" stars="0" /><Project href="https://github.com/sxy1499894281/VAGEN" name="VAGEN" stars="0" /></div>
        </section>
      </div>
    </main>
    <footer><span>© 2026 Xiaoyan Su</span><a href="https://github.com/xyjoey/PRISM">Based on PRISM</a></footer>
  </>;
}

function Project({ href, name, stars }: { href: string; name: string; stars: string }) {
  return <a className="project-row" href={href}><span>{name}</span><span className="stars" aria-label={`${stars} GitHub stars`}>★ {stars}</span></a>;
}
