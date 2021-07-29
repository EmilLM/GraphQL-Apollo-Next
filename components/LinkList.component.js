import Link from './Link.component';
import { useQuery } from '@apollo/client';
import { FEED_QUERY } from '../gql/queries';

const LinkList = () => {
	const { loading, error, data } = useQuery(FEED_QUERY);

	if (data)
		return (
			<div>
				{data.feed.links.map((link, index) => (
					<Link key={link.id} link={link} index={index} />
				))}
			</div>
		);
	if (!data) return null;
	if (error) return <div>{error.message}</div>;
};

export default LinkList;
