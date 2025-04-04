import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className='h-screen bg-gradient-to-b from-zinc-800 via-zinc-900 to-purple-950/20 flex items-center justify-center'>
			<div className='text-center space-y-8 px-4'>
				{/* Large animated musical note */}
				<div className='flex justify-center animate-spin [animation-duration:10s]'>
					<img src="lolhub.png" alt="lolhub logo" className="size-25" />
				</div>

				{/* Error message */}
				<div className='space-y-4'>
					<h1 className='text-7xl font-bold text-white'>404</h1>
					<h2 className='text-2xl font-semibold text-white'>Page not found</h2>
					<p className='text-neutral-400 max-w-md mx-auto'>
						It seems that this song was out of "track". Let's get you back to the music.
					</p>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'>
					<Button
						onClick={() => navigate(-1)}
						variant='outline'
						className='bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto'
					>
						Go Back
					</Button>
					<Button
						onClick={() => navigate("/")}
						className='bg-purple-500 hover:bg-purple-600 text-black w-full sm:w-auto'
					>
						<Home className='mr-2 h-4 w-4' />
						Back to Home
					</Button>
				</div>
			</div>
		</div>
	);
}
