import Link from "next/link";

function LearnMoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>
        <Link href="/">Logo</Link>
      </div>
      {children}
    </section>
  );
}

export default LearnMoreLayout;
