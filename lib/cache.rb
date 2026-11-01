class Cache
  def initialize(ttl: 300)
    @ttl = ttl
    @store = {}
    @muxet = Mutex.new
  end

  def fetch(key, ttl: @ttl)
    @muxet.synchronize do
      entry = @store[key]
      return entry[:value] if entry && entry[:expired_at] > now 
    end

    value = yield

    @muxet.synchronize do 
      @store[key] = {value: value, expired_at: now + @ttl}
    end
    
    value
  end

  def delete(key)
    @muxet.synchronize { @store.delete(key) }
  end

  def clear
    @muxet.synchronize { @store.clear }
  end

  def prune
    @muxet.synchronize { @store.delete_if { |_, entry| entry[:expired_at] <= now } }
  end

  private

  def now
    Process.clock_gettime(:CLOCK_MONOTONIC)
  end
end