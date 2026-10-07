<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio structure
- Keep the imported portfolio at `/` and its full CV at `/cv`, sharing the original CSS and button variants to preserve the source experience.
- Serve copied portfolio media through project-owned asset pointers and keep the image favicon in `public/` so browser icon requests remain reliable.
