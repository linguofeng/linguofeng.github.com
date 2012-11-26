module Jekyll
  
  class TagGenerator < Generator
    safe true
   
    def generate(site)
        generateTag(site)
        deleteNullTag(site)
    end

    # 生成Tag
    def generateTag(site)
      site.tags.keys.each do |tag|
        _path = site.source + '/tag/' + tag
        _file = _path + '/index.textile'
        if !File.exist?(_file) then
          FileUtils.mkdir_p _path
          aFile = File.new(_file, 'w')
            aFile.puts '---'
            aFile.puts 'layout: tag'
            aFile.puts 'title: ' + tag
            aFile.puts 'tag: ' + tag
            aFile.puts '---'
          aFile.close
        end
      end
    end
    
    # 删除不存在的Tag
    def deleteNullTag(site)
      Dir.foreach(site.source + '/tag/') {
        |tagdir|
        if '.' != tagdir && '..' != tagdir then
          if !site.tags.keys.include?(tagdir) then
            FileUtils.rm_rf site.source + '/tag/' + tagdir + '/'
          end
        end
      }
    end
  end

end
