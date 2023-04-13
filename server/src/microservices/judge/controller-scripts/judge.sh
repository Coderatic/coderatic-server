#!/bin/bash

problem=$1
exec=$2
lang=$3
in_file_name=$4
out_file_name=$5

host_shared_path="$(pwd)/../cache/processed"
bin_path="/processed/bins"
scripts_path="/processed/scripts"
test_sets="../cache/test_sets"

in_file="$test_sets"/"$problem"/input/"$in_file_name"
out_file="$test_sets"/"$problem"/output/"$out_file_name"

THE_JUDGE="./THE_JUDGE.out"

case "$lang" in
cpp | c | rust)
	(docker run --rm -v "$host_shared_path/bins":"$bin_path" --runtime=runsc -i -e BIN="$exec" bin_img <"$in_file") | ("$THE_JUDGE" "$out_file")
	exit_code=$?
	;;
java)
	(docker run --rm -v "$host_shared_path/bins":"$bin_path" --runtime=runsc -i -e BIN="$exec" java_img <"$in_file") | ("$THE_JUDGE" "$out_file")
	exit_code=$?
	;;
py3)
	(docker run --rm -v "$host_shared_path/scripts":"$scripts_path" --runtime=runsc -i -e BIN="$exec" py3_img <"$in_file") | ("$THE_JUDGE" "$out_file")
	exit_code=$?
	;;
*)
	echo "Language not supported"
	exit 255
	;;
esac

echo "$exit_code"
exit "$exit_code"

# DOCKER_BUILDKIT=1
# docker build . -t cpp_img -f cpp.Dockerfile
# docker build . -t py3_img -f py3.Dockerfile
