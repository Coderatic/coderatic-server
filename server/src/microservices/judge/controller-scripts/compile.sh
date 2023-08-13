#!/bin/bash

lang=$1
src=$2
bin_name=$src
code_path="../cache/code"

case "$lang" in
cpp)
	g++ "$code_path/$src".cpp -static -O2 -o "$code_path"/"$bin_name"
	;;
c)
	gcc "$code_path/$src".c -static -o "$code_path"/"$bin_name"
	;;
rust)
	rustc "$code_path/$src".rs --crate-type=bin -C prefer-dynamic=no -C target-feature=+crt-static -o "$code_path"/"$bin_name"
	;;
*)
	echo "Language not supported"
	exit 1
	;;
esac

# DOCKER_BUILDKIT=1
# docker build . -t cpp_img -f cpp.Dockerfile
# docker build . -t py3_img -f py3.Dockerfile
