/*
  In-page link to a landing section.

  The app routes on the URL hash (#/medlem, #/booking …), so a plain
  href="#faq" would be read as a route change and the page would jump back to
  the top. This keeps the href for semantics and middle-clicks, but scrolls to
  the section itself on a normal click.
*/
function scrollToSection(id) {
  const node = document.getElementById(id);
  if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SectionLink({ to, children, onClick, ...rest }) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        scrollToSection(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
