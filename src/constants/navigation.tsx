import { ReactNode } from 'react'

const DASHBOARD = '/dashboard'
const OPEN_POSITION = '/open-position'
const YOUR_POSITIONS = '/your-positions'
const AUCTIONS = '/auctions'

export type RouteItem = {
  icon: ReactNode
  iconActive: ReactNode
  key: string
  title: string
  to: string
}

const DashboardRoute: RouteItem = {
  to: DASHBOARD,
  icon: 'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjIgMjIiIHdpZHRoPSIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIGQ9Im05LjI1MjAxIDEyLjQyODItNy4yNTk4NC0zLjg0OGMtLjI5OTU1LS4xNTg3OC0uNTUwMi0uMzk2MTctLjcyNS0uNjg2NjYtLjE3NDgxLS4yOTA0OS0uMjY3MTctLjYyMzEzLS4yNjcxNy0uOTYyMTZzLjA5MjM2LS42NzE2Ni4yNjcxNy0uOTYyMTZjLjE3NDgtLjI5MDQ5LjQyNTQ1LS41Mjc4Ny43MjUtLjY4NjY0bDcuMjU5ODQtMy44NDgwMWMuNTM4NDEtLjI4NTM4IDEuMTM4NDktLjQzNDU3IDEuNzQ3ODktLjQzNDU3LjYwOTMgMCAxLjIwOTQuMTQ5MTkgMS43NDc5LjQzNDU3bDcuMjU5OCAzLjg0ODAxYy4yOTk2LjE1ODc3LjU1MDIuMzk2MTUuNzI1LjY4NjY0LjE3NDguMjkwNS4yNjcyLjYyMzEzLjI2NzIuOTYyMTZzLS4wOTI0LjY3MTY3LS4yNjcyLjk2MjE2LS40MjU0LjUyNzg4LS43MjUuNjg2NjZsLTcuMzExMiAzLjg5OTNjLS41MzM1LjI3NzMtMS4xMjc1LjQxNzgtMS43Mjg3LjQwODktLjYwMTItLjAwOS0xLjE5MDctLjE2NzEtMS43MTU2OS0uNDYwMnoiIHN0cm9rZT0iIzY4Njg2OCIvPjxwYXRoIGQ9Im0yMC4wMDc2IDEzLjQxOTdjLjI5OTYuMTU4OC41NTAyLjM5NjEuNzI1LjY4NjZzLjI2NzIuNjIzMS4yNjcyLjk2MjJjMCAuMzM5LS4wOTI0LjY3MTYtLjI2NzIuOTYyMXMtLjQyNTQuNTI3OS0uNzI1LjY4NjdsLTcuMjU5OCAzLjg0OGMtLjUzODQuMjg1NC0xLjEzODUuNDM0Ni0xLjc0NzkuNDM0NnMtMS4yMDk0Ni0uMTQ5Mi0xLjc0Nzg3LS40MzQ2bC03LjI1OTg2LTMuODQ4Yy0uMjk5NTUtLjE1ODgtLjU1MDE4LS4zOTYyLS43MjQ5OS0uNjg2Ny0uMTc0OC0uMjkwNS0uMjY3MTgtLjYyMzEtLjI2NzE4LS45NjIxIDAtLjMzOTEuMDkyMzgtLjY3MTcuMjY3MTgtLjk2MjIuMTc0ODEtLjI5MDUuNDI1NDQtLjUyNzguNzI0OTktLjY4NjYiIHN0cm9rZT0iI2I1YjViNSIvPjwvZz48L3N2Zz4=',
  iconActive:
    'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjIgMjAiIHdpZHRoPSIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjEuMDE3NTgiIHgyPSIyMS4wMTc2IiB5MT0iNS44MTA0MyIgeTI9IjUuODEwNDMiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTU3NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmNGM4YyIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0ibTkuNjIwOTMgMTAuNzY1Ny03LjI1OTk0LTMuODQ4MDhjLS4xNzkxNS0uMDk0OTYtLjMyOTA2LS4yMzY5NC0uNDMzNjItLjQxMDctLjEwNDU1LS4xNzM3NS0uMTU5NzktLjM3MjY5LS4xNTk3OS0uNTc1NDYgMC0uMjAyNzguMDU1MjQtLjQwMTcyLjE1OTc5LS41NzU0N3MuMjU0NDctLjMxNTc0LjQzMzYyLS40MTA3bDcuMjU5OTQtMy44NDgwM2MuNDMwMTctLjIyODAzNy45MDk3Ny0uMzQ3MjYgMS4zOTY2Ny0uMzQ3MjZzLjk2NjQuMTE5MjIyIDEuMzk2Ni4zNDcyNWw3LjI2IDMuODQ4MDRjLjE3OTEuMDk0OTYuMzI5LjIzNjk1LjQzMzYuNDEwNy4xMDQ1LjE3Mzc1LjE1OTguMzcyNjkuMTU5OC41NzU0NyAwIC4yMDI3Ny0uMDU1My40MDE3MS0uMTU5OC41NzU0Ni0uMTA0Ni4xNzM3Ni0uMjU0NS4zMTU3NC0uNDMzNi40MTA3MWwtNy4yNiAzLjg0ODA3Yy0uNDMwMi4yMjgtLjkwOTcuMzQ3Mi0xLjM5NjYuMzQ3MnMtLjk2NjQtLjExOTItMS4zOTY2Ny0uMzQ3MnoiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJtMTEgMjAuMDAwMWMtLjcwMzYtLjAwMDEtMS4zOTY1My0uMTcyMy0yLjAxODMyLS41MDE2bC02LjYxMTM5LTMuNTA0OWMtLjQxODk5LS4yMjIxLS43Njk1Ni0uNTU0LTEuMDE0MDgtLjk2MDNzLS4zNzM3NDMtLjg3MTUtLjM3Mzc4OC0xLjM0NTdjLS4wMDAwNDUtLjQ3NDEuMTI5MDg4LS45Mzk0LjM3MzUyOC0xLjM0NTdzLjU5NDk2LS43MzgzIDEuMDEzOS0uOTYwNGMuMTA1NTgtLjA1NjEuMjIxMTYtLjA5MDguMzQwMTYtLjEwMjIuMTE4OTktLjAxMTQuMjM5MDYuMDAwOC4zNTMzNi4wMzU4cy4yMjA1OC4wOTIyLjMxMjc3LjE2ODNjLjA5MjIuMDc2LjE2ODUuMTY5Ni4yMjQ1Ni4yNzUxLjA1NjA2LjEwNTYuMDkwNzguMjIxMi4xMDIxNy4zNDAyLjAxMTM4LjExOS0uMDAwNzguMjM5MS0uMDM1NzkuMzUzMy0uMDM1MDIuMTE0My0uMDkyMi4yMjA2LS4xNjgyOS4zMTI4cy0uMTY5NTkuMTY4NS0uMjc1MTcuMjI0NmMtLjEyNjY5LjA2NzEtLjIzMjcxLjE2NzQtLjMwNjY3LjI5MDMtLjA3Mzk1LjEyMjgtLjExMzA2LjI2MzQtLjExMzEuNDA2OC0uMDAwMDUuMTQzMy4wMzg5Ni4yODQuMTEyODQuNDA2OS4wNzM4Ny4xMjI5LjE3OTgzLjIyMzMuMzA2NDguMjkwNWw2LjYxMTM5IDMuNTA0OWMuMzU4OTQuMTkwNS43NTkxNC4yOTAxIDEuMTY1NTQuMjkwMS40MDYzIDAgLjgwNjUtLjA5OTYgMS4xNjU1LS4yOTAxbDYuNjExMy0zLjUwNDljLjEyNjctLjA2NzIuMjMyNi0uMTY3Ni4zMDY1LS4yOTA1cy4xMTI5LS4yNjM1LjExMjktLjQwNjljLS4wMDAxLS4xNDM0LS4wMzkyLS4yODQtLjExMzEtLjQwNjgtLjA3NC0uMTIyOS0uMTgtLjIyMzItLjMwNjctLjI5MDMtLjEwNTYtLjA1NjEtLjE5OTEtLjEzMjQtLjI3NTItLjIyNDZzLS4xMzMyLS4xOTg1LS4xNjgzLS4zMTI4Yy0uMDM1LS4xMTQyLS4wNDcxLS4yMzQzLS4wMzU4LS4zNTMzLjAxMTQtLjExOS4wNDYyLS4yMzQ2LjEwMjItLjM0MDIuMDU2MS0uMTA1NS4xMzI0LS4xOTkxLjIyNDYtLjI3NTEuMDkyMi0uMDc2MS4xOTg0LS4xMzMzLjMxMjctLjE2ODNzLjIzNDQtLjA0NzIuMzUzNC0uMDM1OC4yMzQ2LjA0NjEuMzQwMi4xMDIyYy40MTg5LjIyMjEuNzY5NC41NTQxIDEuMDEzOS45NjA0LjI0NDQuNDA2NC4zNzM1Ljg3MTYuMzczNSAxLjM0NTctLjAwMDEuNDc0Mi0uMTI5My45Mzk0LS4zNzM4IDEuMzQ1N3MtLjU5NTEuNzM4Mi0xLjAxNDEuOTYwM2wtNi42MTE0IDMuNTA0OWMtLjYyMTguMzI5NC0xLjMxNDcuNTAxNi0yLjAxODQuNTAxNnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
  title: 'Dashboard',
  key: 'dashboard',
}

const OpenPositionRoute: RouteItem = {
  to: OPEN_POSITION,
  icon: 'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJtMTcgMjJoLTEwYy0xLjMyNjA4IDAtMi41OTc4NC0uNTI2OC0zLjUzNTUyLTEuNDY0NS0uOTM3NjgtLjkzNzYtMS40NjQ0OC0yLjIwOTQtMS40NjQ0OC0zLjUzNTV2LTEwYzAtMS4zMjYwOC41MjY4LTIuNTk3ODYgMS40NjQ0OC0zLjUzNTU0czIuMjA5NDQtMS40NjQ0NiAzLjUzNTUyLTEuNDY0NDZoMTBjMS4zMjYxIDAgMi41OTc5LjUyNjc4IDMuNTM1NSAxLjQ2NDQ2LjkzNzcuOTM3NjggMS40NjQ1IDIuMjA5NDYgMS40NjQ1IDMuNTM1NTR2MTBjLjAwMDIuNjU2Ny0uMTI5IDEuMzA2OS0uMzgwMyAxLjkxMzYtLjI1MTIuNjA2Ny0uNjE5NSAxLjE1OC0xLjA4MzggMS42MjIzcy0xLjAxNTYuODMyNi0xLjYyMjMgMS4wODM4Yy0uNjA2Ny4yNTEzLTEuMjU2OS4zODA1LTEuOTEzNi4zODAzeiIgc3Ryb2tlPSIjNjg2ODY4IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48ZyBzdHJva2U9IiNiNWI1YjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im04LjUgMTJoNyIvPjxwYXRoIGQ9Im0xMiAxNS41di03Ii8+PC9nPjwvZz48L3N2Zz4=',
  iconActive:
    'PHN2ZyBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InByZWZpeF9fYSIgeDE9IjIuNzIiIHkxPSIxNCIgeDI9IjIyIiB5Mj0iMTQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAyNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk1NzQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjRjOGMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNyAyMS4yNUE0LjI3IDQuMjcgMCAwMTIuNzUgMTdoMFY3aDBhNC4zNCA0LjM0IDAgMDEuMzItMS42M0E0LjU3IDQuNTcgMCAwMTQgNGE0LjU3IDQuNTcgMCAwMTEuMzgtLjkyQTQuMzQgNC4zNCAwIDAxNyAyLjc1aDEwYTQuMzQgNC4zNCAwIDAxMS42My4zMkE0LjU3IDQuNTcgMCAwMTIwIDRhNC41NyA0LjU3IDAgMDEuOTIgMS4zOEE0LjM0IDQuMzQgMCAwMTIxLjI1IDdoMHYxMGgwQTQuMjcgNC4yNyAwIDAxMTcgMjEuMjVIN3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yIC0yKSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZT0idXJsKCNwcmVmaXhfX2EpIi8+PHBhdGggZD0iTTE0LjI1IDEwYS44LjggMCAwMS0uMjMuNTMuNzQuNzQgMCAwMS0uNTIuMjJoLTIuNzV2Mi43NWEuNzUuNzUgMCAwMS0uMjIuNTMuNzcuNzcgMCAwMS0uNTMuMjIuNzUuNzUgMCAwMS0uNTMtLjIyLjcxLjcxIDAgMDEtLjIyLS41M3YtMi43NUg2LjVhLjc1Ljc1IDAgMDEtLjUtLjIyLjc1Ljc1IDAgMDEwLTEuMDYuNzUuNzUgMCAwMS41My0uMjJoMi43NVY2LjVhLjcxLjcxIDAgMDEuMTktLjUuNzUuNzUgMCAwMS41My0uMjUuNzcuNzcgMCAwMS41My4yMi43NS43NSAwIDAxLjIyLjUzdjIuNzVoMi43NWEuNzEuNzEgMCAwMS4yOC4wNi42Ny42NyAwIDAxLjI1LjE2Ljc4Ljc4IDAgMDEuMTYuMjQuNzIuNzIgMCAwMS4wNi4yOXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
  title: 'Open position',
  key: 'open-position',
}

const YourPositionsRoute: RouteItem = {
  to: YOUR_POSITIONS,
  icon: 'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIGQ9Im0xNyAyaC0xMGMtMi43NjE0MiAwLTUgMi4yMzg1OC01IDV2MTBjMCAyLjc2MTQgMi4yMzg1OCA1IDUgNWgxMGMyLjc2MTQgMCA1LTIuMjM4NiA1LTV2LTEwYzAtMi43NjE0Mi0yLjIzODYtNS01LTV6IiBzdHJva2U9IiM2ODY4NjgiLz48cGF0aCBkPSJtNS45Nzc1NCAxNS40NTgxYzEuMTE2MTUtMi4yNTg0IDIuMzg1ODUtMy4xNiAzLjQ5NDM1LTMuNDk0MyAxLjkxOTIxLS41Nzg4IDMuMjEzODEuNTg1NSA1LjEyNzgxIDAgLjc3MjctLjMwODQgMS40NzQ1LS43NzA4IDIuMDYyNy0xLjM1OTEuNTg4My0uNTg4MiAxLjA1MDctMS4yOTAwNSAxLjM1OTEtMi4wNjI3MSIgc3Ryb2tlPSIjYjViNWI1Ii8+PC9nPjwvc3ZnPg==',
  iconActive:
    'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIiIHgyPSIyMiIgeTE9IjExLjc5NTkiIHkyPSIxMS43OTU5Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk1NzQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjRjOGMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Im03IDIuNzVoMTBjMi4zNDcyIDAgNC4yNSAxLjkwMjc5IDQuMjUgNC4yNXYxMGMwIDIuMzQ3Mi0xLjkwMjggNC4yNS00LjI1IDQuMjVoLTEwYy0yLjM0NzIxIDAtNC4yNS0xLjkwMjgtNC4yNS00LjI1di0xMGMwLTIuMzQ3MjEgMS45MDI3OS00LjI1IDQuMjUtNC4yNXoiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJtMTguNjg4MSA4Ljg3MDYxYy0uMzQ1Ljg2OTAzLS44NjczIDEuNjU2NTktMS41MzM3IDIuMzEyNTktLjY2NjMuNjU2LTEuNDYxOSAxLjE2Ni0yLjMzNjMgMS40OTc0LS45NTQ4LjI2MjEtMS45NjE3LjI2OS0yLjkyLjAyLS43MjQtLjE4NjYtMS40ODI3LS4xOTM1LTIuMjA5OTYtLjAyLS42OTI4Mi4yODIzLTEuMzIwMi43MDQxLTEuODQzMTYgMS4yMzkxcy0uOTMwMzQgMS4xNzE5LTEuMTk2ODQgMS44NzA5Yy0uMDYyMDMuMTI3Mi0uMTU4ODUuMjM0MS0uMjc5MjIuMzA4NS0uMTIwMzcuMDc0My0uMjU5MzYuMTEzLS40MDA4My4xMTE1LS4xMTQ0Ni0uMDAyNy0uMjI3LS4wMy0uMzMtLjA4LS4xNzc0NC0uMDg3OC0uMzEyODYtLjI0MjMtLjM3NjU5LS40Mjk4LS4wNjM3Mi0uMTg3NC0uMDUwNTctLjM5MjQuMDM2NTktLjU3MDIgMS4wNC0yLjEgMi4zNy0zLjQxIDMuOTUtMy44OC45NTU1MS0uMjU2OSAxLjk2MTAxLS4yNjM4IDIuOTIwMDEtLjAyLjcyMjcuMTk2NyAxLjQ4MzkuMjAzNiAyLjIxLjAyLjY3NDktLjI3OTUgMS4yODYxLS42OTMxIDEuNzk2Ni0xLjIxNTYuNTEwNS0uNTIyNTIuOTA5Ny0xLjE0MzE2IDEuMTczNC0xLjgyNDQuMDg3OC0uMTc3NDUuMjQyMy0uMzEyODUuNDI5Ny0uMzc2NTguMTg3NS0uMDYzNzMuMzkyNS0uMDUwNTguNTcwMy4wMzY1OS4wODg2LjA0MjU5LjE2NzkuMTAyNDMuMjMzMi4xNzYwMi4wNjUyLjA3MzYuMTE1MS4xNTk0NS4xNDY4LjI1MjU3LjAzMTYuMDkzMTEuMDQ0NC4xOTE2Mi4wMzc2LjI4OTczLS4wMDY5LjA5ODExLS4wMzMzLjE5Mzg3LS4wNzc2LjI4MTY4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
  title: 'Your Positions',
  key: 'your-positions',
}

const LiquidationsRoute: RouteItem = {
  to: AUCTIONS,
  icon: 'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2Utd2lkdGg9IjEuNSI+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJtMjEuNDI4NyAxOS44NTY5aC02LjI4NTciIHN0cm9rZT0iI2I1YjViNSIvPjxwYXRoIGQ9Im0yMyAyM2gtOS40Mjg1IiBzdHJva2U9IiM2ODY4NjgiLz48cGF0aCBkPSJtOC44NTc0MiAxNS4xNDI2LTcuODU3MTEgNy44NTcxIiBzdHJva2U9IiNiNWI1YjUiLz48L2c+PHJlY3QgaGVpZ2h0PSIxMi41NzE0IiByeD0iMy4xNDI4NSIgc3Ryb2tlPSIjNjg2ODY4IiB0cmFuc2Zvcm09Im1hdHJpeCgtLjcwNzEwNyAuNzA3MTA3IC43MDcxMDcgLjcwNzEwNyAxNC4xMTA0IDEpIiB3aWR0aD0iOS40Mjg1NCIvPjwvZz48L3N2Zz4=',
  iconActive:
    'PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk1NzQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjRjOGMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyMyIgeDI9IjEzLjU3MTUiIHhsaW5rOmhyZWY9IiNhIiB5MT0iMjMuNDg5OCIgeTI9IjIzLjQ4OTgiLz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCIgeDI9IjkuNDI4NTQiIHhsaW5rOmhyZWY9IiNhIiB5MT0iNi4xNTc0MiIgeTI9IjYuMTU3NDIiLz48ZyBzdHJva2Utd2lkdGg9IjEuNSI+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJtMjEuNDI4NyAxOS44NTY5aC02LjI4NTciIHN0cm9rZT0iI2ZmZiIvPjxwYXRoIGQ9Im0yMyAyM2gtOS40Mjg1IiBzdHJva2U9InVybCgjYikiLz48cGF0aCBkPSJtOC44NTc0MiAxNS4xNDI2LTcuODU3MTEgNy44NTcxIiBzdHJva2U9IiNmZmYiLz48L2c+PHJlY3QgaGVpZ2h0PSIxMi41NzE0IiByeD0iMy4xNDI4NSIgc3Ryb2tlPSJ1cmwoI2MpIiB0cmFuc2Zvcm09Im1hdHJpeCgtLjcwNzEwNyAuNzA3MTA3IC43MDcxMDcgLjcwNzEwNyAxNC4xMTA0IDEpIiB3aWR0aD0iOS40Mjg1NCIvPjwvZz48L3N2Zz4=',
  title: 'Auctions',
  key: 'auctions',
}

const routesConfig: Record<string, RouteItem> = {
  [DASHBOARD]: DashboardRoute,
  [OPEN_POSITION]: OpenPositionRoute,
  [YOUR_POSITIONS]: YourPositionsRoute,
  [AUCTIONS]: LiquidationsRoute,
}

const routes: RouteItem[] = [
  DashboardRoute,
  OpenPositionRoute,
  YourPositionsRoute,
  LiquidationsRoute,
]

export { routesConfig, routes }
