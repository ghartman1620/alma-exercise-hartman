import { css } from '@emotion/css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={css`
      margin: auto;
      width: 60%
    `}>
      <p>
        <Link href="case-submission">Get an Assessment of your Immigration Case</Link>
      </p>
      <p>
        <Link href="login">View Cases (requires login)</Link>
      </p>
    </div>
  );
}
