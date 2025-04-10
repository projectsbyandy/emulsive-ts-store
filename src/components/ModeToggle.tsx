import { Moon, Sun } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { setTheme } from '@/features/theme/themeSlice';

function ModeToggle() {
 
  const dispatch = useAppDispatch();

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button data-testid='theme' variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem data-testid='light-mode' onClick={() => dispatch(setTheme('light'))}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem data-testid='light-mode' onClick={() => dispatch(setTheme('dark'))}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem data-testid='system-mode' onClick={() => dispatch(setTheme('system'))}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
  </DropdownMenu>
}
export default ModeToggle