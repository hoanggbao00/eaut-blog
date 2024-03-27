import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const SidebarLogo = ({ expanded }: { expanded: boolean }) => {
	return (
		<div className='pb-4 border-gray-200'>
			<h1
				className={cn('text-center font-bold pb-4 text-primary text-xl', {
					hidden: expanded === false,
				})}
			>
				EAUT Management
			</h1>
			<Link
				href={'../'}
				className={cn(
					'block relative w-1/2 aspect-square m-auto transition-all',
					{
						'w-10 m-auto': expanded === false,
					}
				)}
			>
				<Image
					src='/eaut-logo.webp'
					fill
					className='object-cover'
					alt='eaut-logo'
				/>
			</Link>
		</div>
	);
};

export default SidebarLogo;
