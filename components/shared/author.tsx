import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from '@/type';

const Author = ({ user }: { user: User }) => {
	return (
		<div className='flex items-center gap-1'>
			<div className='flex gap-3 items-center'>
				<Avatar className='w-[24px] h-[24px]'>
					<AvatarImage src={user.image} />
					<AvatarFallback>HB</AvatarFallback>
				</Avatar>
				<p className='hover:underline'>{user.name}</p>
			</div>
		</div>
	);
};

export default Author;
