set number
set expandtab
set tabstop=2
set shiftwidth=2

set hlsearch
set incsearch
set pastetoggle=<F2>
set background=dark

"Плагины
call plug#begin('~/.vim/plugged')
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'morhetz/gruvbox'
Plug 'mattn/emmet-vim'
Plug 'jiangmiao/auto-pairs'
Plug 'nelsyeung/twig.vim'
call plug#end()
syntax on
colorscheme gruvbox
let g:user_emmet_install_global=0
autocmd FileType html,css,vue,php,twig EmmetInstall
let g:user_emmet_leader_key=','

"mappings (Горячие клавиши)
map <C-n> :NERDTreeToggle<CR>
