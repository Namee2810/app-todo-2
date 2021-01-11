npm run build
del /s /q "../deploy/app-todo-2-deploy/build"
xcopy /s "./build" "../deploy/app-todo-2-deploy/build"