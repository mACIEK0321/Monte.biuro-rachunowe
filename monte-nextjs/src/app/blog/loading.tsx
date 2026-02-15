export default function BlogLoading() {
  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">Aktualnosci i porady ksiegowe</h1>
        </div>
        <div className="blog-grid blog-grid-full">
          {[1, 2, 3].map((item) => (
            <div key={item} className="blog-card skeleton-card">
              <div className="skeleton skeleton-image" />
              <div className="blog-card-content">
                <div className="skeleton skeleton-text skeleton-date" />
                <div className="skeleton skeleton-text skeleton-title" />
                <div className="skeleton skeleton-text skeleton-excerpt" />
                <div className="skeleton skeleton-text skeleton-excerpt" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
