import Link from 'next/link';
import type { ReactElement } from 'react';
import styles from './page.module.css';

type SellingPoint = {
	title: string;
	description: string;
	highlight: string;
};

const SELLING_POINTS: ReadonlyArray<SellingPoint> = [
	{
		title: 'See the month before it happens',
		description:
			'Lay out bills, goals, and expected spending in one clear plan so the next few weeks feel predictable.',
		highlight: 'Forward-looking budget planning',
	},
	{
		title: 'Keep everyday decisions simple',
		description:
			'Turn scattered balances and rough notes into a single view that helps you decide what you can spend with confidence.',
		highlight: 'Clear day-to-day guidance',
	},
	{
		title: 'Spot pressure points early',
		description:
			'Quickly see where categories start to stretch so you can adjust before small issues become stressful surprises.',
		highlight: 'Early warning for overspending',
	},
	{
		title: 'Build habits that stick',
		description:
			'Use a calmer, more visual workflow that makes regular budget check-ins easier to maintain over time.',
		highlight: 'Designed for consistency',
	},
];

export default function Home(): ReactElement {
	return (
		<main className={styles.page}>
			<section className={styles.mainSection} aria-labelledby="homepage-heading">
				<div className={styles.mainSectionCopy}>
					<p className={styles.eyebrow}>Budget planning that feels lighter</p>
					<h1 id="homepage-heading" className={styles.title}>
						Monio helps make budget planning easier, clearer, and less overwhelming.
					</h1>
					<p className={styles.description}>
						Create a plan you can actually read at a glance. Monio brings your budget
						into a calmer space so you can map upcoming costs, stay organised, and make
						steady decisions with less friction.
					</p>

					<div className={styles.actions}>
						<Link href="/budget-planner" className={styles.primaryAction}>
							Open Budget Planner
						</Link>
						<Link href="#selling-points" className={styles.secondaryAction}>
							Explore key benefits
						</Link>
					</div>

					<ul className={styles.summaryList} aria-label="Budget planning benefits">
						<li>Plan upcoming spending with more confidence</li>
						<li>Keep important budget details in one place</li>
						<li>Review progress through a cleaner, calmer layout</li>
					</ul>
				</div>

				<div className={styles.visualStage} aria-hidden="true">
					<div className={`${styles.floatingCard} ${styles.cardLarge}`}>
						<span className={styles.cardLabel}>Monthly plan</span>
						<strong className={styles.cardTitle}>Upcoming essentials</strong>
						<p className={styles.cardText}>Rent, subscriptions, groceries, savings</p>
					</div>

					<div className={`${styles.floatingCard} ${styles.cardMedium}`}>
						<span className={styles.cardLabel}>Clarity</span>
						<strong className={styles.cardTitle}>One tidy overview</strong>
						<p className={styles.cardText}>Understand what matters before the month starts.</p>
					</div>

					<div className={`${styles.floatingCard} ${styles.cardSmall}`}>
						<span className={styles.cardLabel}>Momentum</span>
						<strong className={styles.cardTitle}>Small check-ins</strong>
						<p className={styles.cardText}>Stay on track without the usual mental load.</p>
					</div>

					<div className={styles.glow} />
				</div>
			</section>

			<section
				id="selling-points"
				className={styles.sellingPoints}
				aria-labelledby="selling-points-heading"
			>
				<div className={styles.sectionHeading}>
					<p className={styles.sectionEyebrow}>Why it works</p>
					<h2 id="selling-points-heading" className={styles.sectionTitle}>
						Each part of the experience is built to reduce budget friction.
					</h2>
				</div>

				<div className={styles.grid}>
					{SELLING_POINTS.map((point) => (
						<article key={point.title} className={styles.featureCard}>
							<p className={styles.featureHighlight}>{point.highlight}</p>
							<h3 className={styles.featureTitle}>{point.title}</h3>
							<p className={styles.featureDescription}>{point.description}</p>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
