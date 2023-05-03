#!/bin/bash

lang=$1
src=$2
bin_name=$src
bin_path="../cache/processed/bins"
compiled_src_path="../cache/src/compiled"
interpreted_src_path="../cache/src/interpreted"
interpreted_dest_path="../cache/processed/scripts"

case "$lang" in
cpp)
	g++ "$compiled_src_path/$src".cpp -static -static-libgcc -static-libstdc++ -O0 -o "$bin_path"/"$bin_name"
	;;
c)
	gcc "$compiled_src_path/$src".c -static -static-libgcc -o "$bin_path"/"$bin_name"
	;;
rust)
	rustc "$compiled_src_path/$src".rs --crate-type=bin -C prefer-dynamic=no -C target-feature=+crt-static -o "$bin_path"/"$bin_name"
	;;
java)
	javac "$compiled_src_path/$src".java -d "$bin_path"/
	;;
py3)
	cp "$interpreted_src_path/$src".py "$interpreted_dest_path"
	;;
*)
	echo "Language not supported"
	exit 1
	;;
esac

# DOCKER_BUILDKIT=1
# docker build . -t cpp_img -f cpp.Dockerfile
# docker build . -t py3_img -f py3.Dockerfile
