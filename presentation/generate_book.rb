#!/usr/bin/env ruby
STDOUT.sync = true

require "mysql"
@db = Mysql.new("localhost", "root", "", "sudoku")

print "Latex output file name [book.tex]: "
filename = gets.chomp

filename = "book.tex" if filename.empty?

print "Generate book with random rating progression? (y/n): "
random_rating = gets.chomp

File.open(filename, "w") do |file|
  file << '\documentclass[twoside,letterpaper]{book}
  \usepackage{sudoku}
  \usepackage{multicol}
  \usepackage[paperheight=8.5in,paperwidth=5.5in,twoside,left=1.5in,right=0.5in,top=1in,bottom=1in]{geometry}
  \setlength\sudokusize{8.5cm}
  \setlength\sudokuthickline{1pt}
  \setlength\sudokuthinline{0.2pt}
  \renewcommand*\sudokuformat[1]{\huge\sffamily#1}
  \usepackage{fancyhdr}

  \begin{document}
  \pagestyle{fancy}
  \fancyhead{}
  \fancyfoot{}
  \fancyfoot[RO,LE]{\thepage}
  \fancyhead[RE,LO]{John\'s Year of Sudoku}
  \renewcommand{\footrulewidth}{0.2pt}
  \renewcommand{\headrulewidth}{0.2pt}

  \begin{center}
  '

  month_names = ["January", "February",
                 "March", "April",
                 "May", "June",
                 "July", "August",
                 "September", "October",
                 "November", "December"]

  january = Array.new
  february = Array.new
  march = Array.new
  april = Array.new
  may = Array.new
  june = Array.new
  july = Array.new
  august = Array.new
  september = Array.new
  october = Array.new
  november = Array.new
  december = Array.new

  months = Array.new

  months << january
  months << february
  months << march
  months << april
  months << may
  months << june
  months << july
  months << august
  months << september
  months << october
  months << november
  months << december

  # January
  print "Retrieving January...\t\t"
  result = @db.query("select id, puzzle, solution, rating from puzzles " +
                     "where rating<100 and rating>10 and "               +
                     "constraints not rlike '[thxyw]' order by rand() "  +
                     "limit 31")
  while res = result.fetch_hash
    months[0] << res
  end

  print "done.\n"

  months.each_with_index do |month, j|
    month.each_with_index do |day, i|
      print "\rGenerating puzzle pages: #{month_names[j]} #{i+1}...\t\t"
      file << '\vspace*{1in}'+"\n"
      file << '\begin{sudoku}'+"\n"
      9.times do |d|
        p = day["puzzle"].gsub('.',' ')
        c = d*9
        file << "|#{p[c+0].chr}|#{p[c+1].chr}|#{p[c+2].chr}|#{p[c+3].chr}|#{p[c+4].chr}|#{p[c+5].chr}|#{p[c+6].chr}|#{p[c+7].chr}|#{p[c+8].chr}|.\n"
      end
      file << '\end{sudoku}'+"\n"
      file << '\vspace*{0.1in}'+"\n"
      file << '\footnotesize'+"\n"
      file << "Solution on page \\pageref{puzzle#{day["id"]}}\n"
      file << '\fancyhead[RO,LE]{'+"#{month_names[j]} #{i+1}"+'}'+"\n"
      file << '\fancyfoot[RE,LO]{'+"Rating: #{day["rating"]}"+'}'+"\n"
      file << '\newpage'+"\n"
    end
  end
  print "done.\n"

  file << '\newpage'+"\n"
  file << '\setlength\sudokusize{4cm}'+"\n"
  file << '\setlength\sudokuthickline{1pt}'+"\n"
  file << '\setlength\sudokuthinline{0.1pt}'+"\n"
  file << '\renewcommand*\sudokuformat[1]{\normalsize\sffamily#1}'+"\n"
  file << '\footnotesize'+"\n"
  file << '\fancyhead[RO,LE]{Solutions}'+"\n"
  file << '\fancyfoot[RE,LO]{}'+"\n"
  file << '\setlength{\columnsep}{15pt}'+"\n"
  file << '\begin{multicols}{2}'+"\n"

  x = 0

  31.times do |i|
    months.each_with_index do |month, j|
      if month[i]
        print "\rGenerating solution pages: #{month_names[j]} #{i+1}...\t"
        p = month[i]["solution"]
        unless p.empty?
          file << "#{month_names[j]} #{i+1}\\label{puzzle#{month[i]["id"]}}\\\\*\n"
          file << '\begin{sudoku}'+"\n"
          9.times do |d|
            c = d*9
            file << "|#{p[c+0].chr}|#{p[c+1].chr}|#{p[c+2].chr}|#{p[c+3].chr}|#{p[c+4].chr}|#{p[c+5].chr}|#{p[c+6].chr}|#{p[c+7].chr}|#{p[c+8].chr}|.\n"
          end
          file << '\end{sudoku}'+"\n"
          file << '\vspace{0.2in}'+"\n"
          x+=1
          if x%3==0
            file << '\columnbreak'+"\n"
          end
        end
      end
    end
  end
  file << '\vfill'+"\n"
  file << '\pagebreak'+"\n"
  print "done.\n"

  file << '\end{multicols}'+"\n"
  file << '\end{center}'+"\n"
  file << '\end{document}'+"\n"

  print "File written to #{filename}\n\n"
end
