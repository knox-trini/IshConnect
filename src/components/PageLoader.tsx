export function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="IshConnect is loading">
      <div className="page-loader__inner">
        <div className="page-loader__head">
          <span className="page-loader__skel page-loader__avatar" />
          <div className="page-loader__rows" style={{ flex: 1, gap: 6 }}>
            <span className="page-loader__skel page-loader__title" />
            <span
              className="page-loader__skel"
              style={{ height: 12, width: "45%", borderRadius: 6 }}
            />
          </div>
        </div>
        <span className="page-loader__skel page-loader__hero" />
        <div className="page-loader__rows">
          <span className="page-loader__skel" style={{ height: 14, width: "92%", borderRadius: 6 }} />
          <span className="page-loader__skel" style={{ height: 14, width: "100%", borderRadius: 6 }} />
          <span className="page-loader__skel" style={{ height: 14, width: "72%", borderRadius: 6 }} />
        </div>
        <div className="page-loader__grid">
          <span className="page-loader__skel page-loader__card" />
          <span className="page-loader__skel page-loader__card" />
        </div>
      </div>
      <span className="sr-only">Loading, please wait…</span>
    </div>
  );
}
