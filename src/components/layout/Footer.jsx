/**
 * Footer , minimal hairline, copyright + social icons.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-edge py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-text-muted">
          © 2025 Fares Matar. Built by me.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/faris-matar-28b86630b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-primary transition-colors duration-fast"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.339 18.337V9.991H5.67v8.346H8.34zM7.005 8.84a1.548 1.548 0 1 0 0-3.095 1.548 1.548 0 0 0 0 3.094zm11.332 9.498v-4.57c0-2.474-1.339-3.625-3.124-3.625-1.44 0-2.083.79-2.443 1.346V9.99h-2.668c.035.752 0 8.346 0 8.346h2.668v-4.66c0-.24.017-.481.087-.652.193-.48.633-.978 1.371-.978.967 0 1.354.737 1.354 1.815v4.475h2.755z" />
            </svg>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-primary transition-colors duration-fast"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.341-3.369-1.341-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
