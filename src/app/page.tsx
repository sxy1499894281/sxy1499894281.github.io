import Image from 'next/image';
import { getConfig } from '@/lib/config';

export default function Home() {
  const { author, social } = getConfig();
  return <>
    <header className="topbar"><a className="wordmark" href="#">Xiaoyan Su</a><nav aria-label="Main navigation"><a href="#github">GitHub</a><a href="#publications">Publications</a></nav></header>
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
      <div className="content">
        <section id="github"><h2>GitHub</h2><article className="project github-card"><h3><a href={social.github as string}>github.com/sxy1499894281 ↗</a></h3><p>Code, datasets, and research tools.</p><div className="resource-links"><a href="https://github.com/sxy1499894281/VCG-Bench">VCG-Bench</a><a href="https://github.com/sxy1499894281/drawio-reconstruction-skill">Draw.io Reconstruction Skill</a></div></article></section>
        <section id="publications"><h2>Selected publication</h2>
          <article>
            <p className="venue">ICML 2026</p>
            <h3><a href="https://arxiv.org/abs/2605.15677">VCG-Bench: Towards A Unified Visual-Centric Benchmark for Structured Generation and Editing</a></h3>
            <p className="authors"><strong>Xiaoyan Su</strong>, Peijie Dong, Zhenheng Tang, Song Tang, Yuyao Zhai, Kaitao Lin, Liang Chen, Yuhang Gai, Yuyu Luo, Qiang Wang, Xiaowen Chu</p>
            <a className="paper-image" href="https://sxy1499894281.github.io/VCG-Bench/" aria-label="Explore the VCG-Bench project"><Image src="/assets/vcg-overview.webp" width={1530} height={793} alt="VCG-Bench compares pixel-based diagram generation with executable, editable diagram representations" /></a>
            <p className="description">Evaluating whether vision-language models can reconstruct diagrams as executable mxGraph XML and edit them through natural-language instructions.</p>
            <div className="resource-links"><a href="https://arxiv.org/abs/2605.15677">Paper</a><a href="https://github.com/sxy1499894281/VCG-Bench">Code</a><a href="https://huggingface.co/datasets/sxy1620348809/VCG-Bench">Dataset</a><a href="https://sxy1499894281.github.io/VCG-Bench/">Project page</a><a href="/publications.bib" download>BibTeX</a></div>
          </article>
        </section>
      </div>
    </main>
    <footer><span>© 2026 Xiaoyan Su</span><a href="https://github.com/xyjoey/PRISM">Based on PRISM</a></footer>
  </>;
}
