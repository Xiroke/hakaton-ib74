Краткий гайд запуск DEV

ДОКЕР
docker compose -f docker-compose.dev.yaml up

БЭКЭНД
найти bdu.xml и положить в папку backend

переименовать

.env.development.example - >.env.development

указать в нем PENTEST_TOKEN

python3 -m venv .venv

pip install -r requirements.txt

в папке backend
uvicorn src.app.main:app --reload --reload-exclude '*/exploits_templates/*' --reload-exclude '*/venv/*'  --reload-exclude '*/exploits/*'

ФРОНТЕНД
npm i
npm run dev

открыть
localhost:3000
