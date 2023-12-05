package internal

import (
	"fmt"
	"os"
	"strings"
)

func RequireEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		panic(fmt.Errorf("required environment variable not set: %s", key))
	}

	return value
}

func GetMultivalueInput(key string) []string {
	value := os.Getenv(key)
	multi := strings.Split(value, ",")
	result := []string{}
	for _, str := range multi {
		val := strings.TrimSpace(str)
		if val != "" {
			result = append(result, val)
		}
	}
	return result
}

type Set[T comparable] map[T]struct{}

func (s Set[T]) Has(item T) bool {
	_, ok := s[item]
	return ok
}

func (s Set[T]) Add(item T) {
	s[item] = struct{}{}
}

func (s Set[T]) Del(item T) {
	delete(s, item)
}

func Dim(contents string) string {
	return fmt.Sprintf("\033[2m%s\033[22m", contents)
}

type Printer interface{ Print(string) }

func NewPrinter() Printer { return printerImpl{seen: Set[string]{}} }

type printerImpl struct{ seen Set[string] }

func (p printerImpl) Print(line string) {
	if !p.seen.Has(line) {
		p.seen.Add(line)
		fmt.Println(line)
	}
}

func GetInput(name string) string {
	if val, ok := os.LookupEnv(fmt.Sprintf("INPUT_%s", name)); ok {
		return val
	}

	if val, ok := os.LookupEnv(name); ok {
		return val
	}

	return ""
}
