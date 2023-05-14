#!/bin/bash

problem="$1"
exec="$2"
lang="$3"
in_file_name="$4"
out_file_name="$5"

proc_path="../cache/processed"
test_sets="../cache/test_sets"

in_file="$test_sets"/"$problem"/input/"$in_file_name"
out_file="$test_sets"/"$problem"/output/"$out_file_name"

THE_JUDGE="./THE_JUDGE.out"

mem_limit="$6"
time_limit="$7"

case "$lang" in
cpp | c | rs)
	(ulimit -t "$time_limit" -v "$mem_limit"; aa-exec -p bin_jail "$proc_path/bins/$exec")  <"$in_file" | "$THE_JUDGE" "$out_file"
	pipe_exit_codes=("${PIPESTATUS[@]}")
	program_exit_code="${pipe_exit_codes[0]}"
	judge_exit_code="${pipe_exit_codes[1]}"

	exit_code=$judge_exit_code
	if [ "$program_exit_code" -ne 0 ]; then
		exit_code=$program_exit_code
	fi
	;;
java)
	(docker run --rm -v "$host_shared_path/bins":"$bin_path" --runtime=runsc -i -e BIN="$exec" java_img <"$in_file") | ("$THE_JUDGE" "$out_file")
	exit_code=$?
	;;
py)
	(ulimit -t "$time_limit" -v "$mem_limit"; aa-exec -p py3_jail python3 "$proc_path/scripts/$exec.$lang")  < "$in_file" | "$THE_JUDGE" "$out_file"
	pipe_exit_codes=("${PIPESTATUS[@]}")
	program_exit_code="${pipe_exit_codes[0]}"
	judge_exit_code="${pipe_exit_codes[1]}"

	exit_code=$judge_exit_code
	if [ "$program_exit_code" -ne 0 ]; then
		exit_code=$program_exit_code
	fi
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
