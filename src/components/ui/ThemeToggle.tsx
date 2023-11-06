import React from 'react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							const newTheme = theme === 'dark' ? 'light' : 'dark';
							setTheme(newTheme);
						}}>
						{theme === 'dark' ?
							<SunIcon
								className='h-4 w-4'
							/> :
							<MoonIcon
								className='h-4 w-4'
							/>
						}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Toggle theme</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};