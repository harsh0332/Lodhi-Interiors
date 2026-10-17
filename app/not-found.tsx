import { PageIntro, TextLink } from '@/components/editorial/Elements';
export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 · A little off plan"
        title="This space"
        italic="is still a blank canvas."
        description="We couldn’t find the page you were looking for. There are plenty of other spaces to explore."
      />
      <div className="wrap page-body">
        <TextLink href="/work">Explore our work</TextLink>
      </div>
    </>
  );
}
