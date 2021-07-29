import Head from 'next/head';
import AddLink from '../components/AddLink.component';
import Nav from '../components/Nav.component';

export default function Home() {
	return (
		<>
			<Head>
				<title>New Link</title>
			</Head>
			<div className='center w85'>
				<Nav />

				<div className='ph3 pv1 background-gray'>
					<AddLink />
				</div>
			</div>
		</>
	);
}
