rm -rf _hosting.tar.gz
# rm -rf _hosting
mkdir -p _hosting/public
cp -r app _hosting/
cp -r bootstrap _hosting/
cp -r config _hosting/
cp -r resources _hosting/
cp -r routes _hosting/
# cp -r vendor _hosting/
cp -r composer.json _hosting/
cp -r composer.lock _hosting/

cp -r public/_nuxt _hosting/

rm -rf _hosting/public/images/*
rm -rf _hosting/public/exports/excel/*

dot_clean -m _hosting
cd _hosting
tar -cvzf _hosting.tar.gz *
cp _hosting.tar.gz ../
cd ..
rm -rf _hosting
