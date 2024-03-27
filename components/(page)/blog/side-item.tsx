import Author from '@/components/shared/author';
import CategoryTag from '@/components/shared/category-tag';
import { Thread } from '@/type';
import Link from 'next/link';

const SideItem = async ({ data }: { data: Thread }) => {	
	return (
		data && (
			<div className='flex flex-col gap-1'>
				<div>{data.cat && <CategoryTag data={data.cat} />}</div>
				<div>
					<Link
						href={`/thread/${data.slug}`}
						className='cursor-pointer text-base font-bold hover:underline'
					>
						{data.title}
					</Link>
				</div>
				<div>
					<Author user={data.user} />
				</div>
			</div>
		)
	);
};

export default SideItem;
