import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { getMarkdownData } from '../../lib/getMarkdownData';
import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
	const dam = await getMarkdownData('dam.md');

	return {
		props: {
			dam,
		},
	};
}

export default function DAM({ dam }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Digital Asset Management</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Digital Asset Management 🕵️‍♀️</h1>
				<a href="/" className={styles.link}>
					<h2>Take me Home</h2>
				</a>

				<div className={styles.grid}>
					<div className={styles.socialsCard}>
						<h2>News & Announcements</h2>
						<a href="" className={styles.link}>
							<li>Cool new Content Hub things</li>
						</a>
					</div>

					<div className={styles.socialsCard}>
						<ReactMarkdown>{dam.markdown}</ReactMarkdown>
					</div>
				</div>
			</main>
		</div>
	);
}
