import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router";

export const Header = () => {
  return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
					<img src='/lolhub.png' className='size-12 text-black' />
				</Link>
				<div>
					<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
					<p className='text-zinc-400 mt-1'>Music management</p>
				</div>
			</div>
			<UserButton />
		</div>
	);
}
