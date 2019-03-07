class AppInfo
  Item = Struct.new(:label, :version)
  class Item; end

  REV_FILE_NAME = ".gitrev".freeze
  YARN_LOCK_FIL_NAME = "yarn.lock".freeze
  YARN_PACKAGES_PREFIX = [
    "@rails/webpacker",
    "axios",
    "class-transformer",
    "dayjs",
    "lozad",
    "vue",
    "vuetify",
  ].freeze

  def initialize
    load_revision
    load_yarn_packages_versions
  end

  def systems
    system_versions.collect do |label, version|
      Item.new label, version
    end
  end

  def js_packages
    @yarn_packages_versions.collect do |label, version|
      Item.new label, version
    end
  end

  private

  def load_revision
    case
    when File.exist?(rev_file_path)
      @revision = File.read(rev_file_path).strip
    when Dir.exist?(Rails.root.join(".git"))
      @revision = `git rev-parse HEAD`&.strip
    else
      @revision = "unkown"
    end
  end

  def load_yarn_packages_versions
    @yarn_packages_versions = {}
    return unless File.exist?(yarn_lock_file_path)

    begin
      package_name = nil
      File.foreach(yarn_lock_file_path) do |line|
        if package_name
          m = /version \"(?<version>.*)\"/.match(line)
          @yarn_packages_versions.merge!(package_name => m[:version])
          package_name = nil
        end

        if m = Regexp.union(YARN_PACKAGES_PREFIX.collect { |e| /(?<package>#{e})@/ }).match(line)
          package_name = m[:package]
        end
      end
    rescue SystemCallError => e
      puts e
    end
  end

  def rev_file_path
    Rails.root.join(REV_FILE_NAME)
  end

  def yarn_lock_file_path
    Rails.root.join(YARN_LOCK_FIL_NAME)
  end

  def system_versions
    {
      revision: @revision,
      ruby: RUBY_VERSION,
      rails: Rails.version,
    }
  end
end
