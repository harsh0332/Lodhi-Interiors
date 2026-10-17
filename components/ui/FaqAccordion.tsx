export function FaqAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div className="cin-faq-list">
      {faqs.map((f) => (
        <details key={f.question}>
          <summary>
            {f.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
