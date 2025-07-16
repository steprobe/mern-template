#/bin/sh

cd frontend && npm run test && npm run lint && VITE_API_URL=http://dummy-to-test-build-ok.com npm run build && cd ..
cd backend && npm run test && npm run lint && cd ..
cd tools && npm run lint
