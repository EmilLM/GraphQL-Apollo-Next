import Link from 'next/link';
import { useRouter } from 'next/router';
import { AUTH_TOKEN } from '../constants';

const Nav = () => {
	const router = useRouter();
	const authToken = global.localStorage?.getItem(AUTH_TOKEN);

	return (
		<div className='flex pa1 justify-between nowrap orange'>
			<div className='flex flex-fixed black'>
				<div className='fw7 mr1'>Hacker News</div>
				<Link href='/' className='ml1 no-underline black'>
					new
				</Link>
				<div className='ml1'>|</div>
				<Link href='/top' className='ml1 no-underline black'>
					top
				</Link>
				<div className='ml1'>|</div>
				<Link href='/search' className='ml1 no-underline black'>
					search
				</Link>
				{authToken && (
					<div className='flex'>
						<div className='ml1'>|</div>
						<Link href='/new' className='ml1 no-underline black'>
							submit
						</Link>
					</div>
				)}
			</div>
			<div className='flex flex-fixed'>
				{authToken ? (
					<div
						className='ml1 pointer black'
						onClick={() => {
							global.localStorage.removeItem(AUTH_TOKEN);
							router.push(`/`);
						}}
					>
						logout
					</div>
				) : (
					<Link href='/login' className='ml1 no-underline black'>
						login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Nav;
